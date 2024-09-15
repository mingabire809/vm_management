<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RatePlan;
use App\Models\Subscription;
use App\Models\Payment;
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
}
