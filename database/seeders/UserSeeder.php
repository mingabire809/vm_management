<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\VM;
use App\Models\RatePlan;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Admin User',
            'email' => 'admin@careldevstudio.com',
            'password' => Hash::make('Admin.12'),
        ]);

        // Create another user
        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
        ]);

        RatePlan::create([
            'name' => 'Platinum',
            'price' => 5000,
            'number_of_vm_allowed' => 10,
            'number_of_backup_allowed' => 10
        ]);

        RatePlan::create([
            'name' => 'Gold',
            'price' => 4000,
            'number_of_vm_allowed' => 8,
            'number_of_backup_allowed' => 8
        ]);

        RatePlan::create([
            'name' => 'Silver',
            'price' => 3000,
            'number_of_vm_allowed' => 6,
            'number_of_backup_allowed' => 6
        ]);

        RatePlan::create([
            'name' => 'Bronze',
            'price' => 2000,
            'number_of_vm_allowed' => 4,
            'number_of_backup_allowed' => 4
        ]);

        VM::create([
            'name' => 'Windows 10',
            'storage' => 32,
            'ram' => 8,
            'processor' => 'Core i5 Intel',
            'user_id' => $user->id,
            'status' => 'active'
        ]);

        // You can also use factories to seed multiple users
        User::factory()->count(10)->create(); 
    }
}
