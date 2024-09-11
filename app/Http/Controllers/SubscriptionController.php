<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RatePlan;
use App\Models\Subscription;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Http\Resources\SubscriptionResource;

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

        

        return redirect()->back()->with('sucess', 'Subscription made successfully');
    }
}
