<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
//use PHPUnit\Framework\TestCase;
use Tests\TestCase; 
use Illuminate\Support\Facades\Hash;
use App\Models\VM;
use App\Models\User;

class VMTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_creation()
    {

        $user = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
        ]);


        $vm = VM::create([
            'name' => 'Windows 10',
            'storage' => 32,
            'ram' => 8,
            'processor' => 'Core i5 Intel',
            'user_id' => $user->id,
            'status' => 'active'
        ]);

        $this->assertDatabaseHas('v_m_s', [
            'name' => 'Windows 10',
        ]);
    }
}