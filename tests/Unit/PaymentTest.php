<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
//use PHPUnit\Framework\TestCase;
use Tests\TestCase; 
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Payment;
use Illuminate\Support\Str;

class PaymentTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_creation()
    {

        $user = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
        ]);


        $payment = Payment::create([
            'user_id' => $user->id,
            'transaction_number' => Str::upper(Str::random(10)),
            'amount' => 10000,

        ]);

        $this->assertDatabaseHas('payments', [
            'user_id' => $user->id
        ]);
    }
}