<?php

namespace App\Http\Controllers;
use App\Models\Billing;
use App\Models\BillPayment;
use Inertia\Inertia;
use App\Models\Payment;
use Illuminate\Support\Str;

use Illuminate\Http\Request;

class BillingController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $payments = $user->payments;
        $bill = $user->billing;

        return Inertia::render('Billing/Index', [
            'billing' => $bill,
            'payments' => $payments
        ]);
    }

    public function pay(Request $request)
    {
        $user = auth()->user();
        $bill = $user->billing;

        BillPayment::create([
            'user_id' => $user->id,
            'amount' => $bill->bill
        ]);

        Payment::create([
            'user_id' => $user->id,
            'transaction_number' => Str::upper(Str::random(10)),
            'amount' => $bill->bill,

        ]);

        $bill->update([
            'bill' => 0,
            'status' => 'paid'
        ]);

        return redirect()->back()->with('success', 'Bill paid successfully');
    }
}
