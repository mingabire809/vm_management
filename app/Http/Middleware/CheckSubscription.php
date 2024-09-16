<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Subscription;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class CheckSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if ($user->subscription && $user->subscription->expiring_date >= Carbon::now()) {
            return $next($request); // Allow access if the user has a valid subscription
        }
    
        // Check if the user is in the child_account of any valid subscription using 'expiring_date'
        $subscriptions = Subscription::where('expiring_date', '>=', Carbon::now())->get();

        // Flatten child_account arrays and check if user is a child
        $subscriptionAsChild = $subscriptions->first(function ($subscription) use ($user) {
            $childAccounts = $this->flattenArray($subscription->child_account ?? []);
            return in_array($user->id, $childAccounts);
        });
    
        // Allow access if the user is found as a child account in a valid subscription
        if ($subscriptionAsChild) {
            return $next($request);
        }
        
    return redirect()->route('subscription.index');
        //return $next($request);
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
}
