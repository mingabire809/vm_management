<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RatePlan;
use App\Models\Subscription;
use App\Models\Payment;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Http\Resources\SubscriptionResource;
use Illuminate\Support\Str;

class SubscriptionController extends Controller
{
    public function index()
    {
        $rate = RatePlan::all();
        $user = auth()->user();


        $response = [
            'rate' => $rate,
        ];
    
        // Conditionally add 'subscription' if it's not null
        if ($user->subscription) {
            $response['subscription'] = new SubscriptionResource($user->subscription);
            $subscription = $user->subscription;
            if (!empty($subscription->child_account)) {
            // Ensure that child_account is an array of user IDs
            $childAccountIds = is_array($subscription->child_account) ? $subscription->child_account : [];

            // Query users whose ids are in the child_account array
            $childAccounts = User::whereIn('id', $this->flattenArray($childAccountIds))->get();

            // Add subscription and child accounts to the response
            $response['subscription'] = new SubscriptionResource($subscription);
            $response['child_accounts'] = $childAccounts;
        } else {
            // Handle case where there are no child accounts
            $response['subscription'] = new SubscriptionResource($subscription);
            $response['child_accounts'] = [];
        }
        }
    
        return Inertia::render('Subscription/Index', $response);
    }

    public function subscribe(Request $request)
    {
        $user = auth()->user();

        $now = Carbon::now();

        $rate = RatePlan::find($request->rateplan_id);
        
        

        if($user->subscription){
            $user->subscription->update([
                'rateplan_id' => $request->rateplan_id,
                'starting_date' => $now,
                'expiring_date' => $now->copy()->addDays(30)
            ]);
        }else{
            Subscription::create([
                'user_id' => $user->id,
                'rateplan_id' => $request->rateplan_id,
                'starting_date' => $now,
                'expiring_date' => $now->copy()->addDays(30)
            ]);
        }

        Payment::create([
            'user_id' => $user->id,
            'transaction_number' => Str::upper(Str::random(10)),
            'amount' => $rate->price,

        ]);
        

        return redirect()->back()->with('sucess', 'Subscription made successfully');
    }

    public function users()
    {
        $user = User::all();
       
            return response()->json($user->map(function ($users) {
                return [
                    'id' => $users->id,
                    'name' => $users->name,
                ];
            }));
       
    }

    public function add_child_account(Request $request, $subscriptionId)
    {   
        $user = auth()->user();
        $subscription = Subscription::findOrFail($subscriptionId);
    
        // Ensure the user is authorized to modify the subscription
        if ($user->id !== $subscription->user_id) {
            return redirect()->back()->with('error', 'Cannot add child account');
        }
    
        // Retrieve the current child_account array
        $childAccounts = $subscription->child_account ?? [];
    
        // Ensure $childAccounts is an array and flatten any nested arrays
        if (is_array($childAccounts)) {
            $childAccounts = $this->flattenArray($childAccounts);
        }
    
        // Add the new user_id if it is not already present
        if (!in_array($request->user_id, $childAccounts)) {
            $childAccounts[] = $request->user_id;
        }
    
        // Update the subscription with the new child_account array
        $subscription->update(['child_account' => array_values($childAccounts)]);
    
        return redirect()->back()->with('success', 'User added to child account');
    }
    
    /**
     * Flatten a multidimensional array to a single level array
     *
     * @param array $array
     * @return array
     */
    protected function flattenArray(array $array)
    {
        $flatArray = [];
    
        foreach ($array as $item) {
            if (is_array($item)) {
                // Recursively flatten nested arrays
                $flatArray = array_merge($flatArray, $this->flattenArray($item));
            } else {
                // Add non-array items to the flat array
                $flatArray[] = $item;
            }
        }
    
        // Remove null values and duplicates
        return array_values(array_unique(array_filter($flatArray)));
    }

public function remove_child_account(Request $request, $subscriptionId)
{
    $user = auth()->user();
    $subscription = Subscription::findOrFail($subscriptionId);

    // Ensure the user is authorized to modify the subscription
    if ($user->id !== $subscription->user_id) {
        return redirect()->back()->with('error', 'Cannot remove child account');
    }

    // Retrieve and flatten the current child_account array
    $childAccounts = $subscription->child_account ?? [];
    if (is_array($childAccounts)) {
        // Flatten any nested arrays and filter out null values
        $childAccounts = collect($childAccounts)->flatten()->filter()->unique()->values()->toArray();
    } else {
        $childAccounts = [];
    }

    // Remove the specified user_id if it exists
    $childAccounts = array_filter($childAccounts, function ($id) use ($request) {
        return $id != $request->user_id;
    });

    // Update the subscription with the modified child_account array
    $subscription->update(['child_account' => array_values($childAccounts)]);

    return redirect()->back()->with('success', 'User removed from child account');
}
}
