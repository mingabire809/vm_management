<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
//use PHPUnit\Framework\TestCase;
use Tests\TestCase; 
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_creation()
    {
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
        ]);
    }
}