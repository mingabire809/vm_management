<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;

class FilamentResourceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a user with the required email domain
        $this->actingAs(User::factory()->create([
            'email' => 'admin@careldevstudio.com', // Email matches the domain check
            'email_verified_at' => now(), // Assuming you also require the email to be verified
        ]));
    }

    public function test_can_access_user_resource()
    {
        // Visit the Filament User resource page
        $response = $this->get('/admin/users'); // Adjust the URL based on your Filament setup

        $response->assertStatus(200);
        $response->assertSee('Users'); // Assuming 'Users' is the heading in your resource
    }

  /*  public function test_can_create_user()
{
    // Acting as an admin
   // $admin = User::factory()->create(['email' => 'test@careldevstudio.com']);
    //$this->actingAs($admin);

    $data = [
        'name' => 'New User',
        'email' => 'newuser@example.com',
        'password' => 'password',
    ];

    $response = $this->post('/admin/users', $data);

    $this->assertDatabaseHas('users', [
        'name' => 'New User',
        'email' => 'newuser@example.com',
    ]);

    $response->assertRedirect('/admin/users');
}
    
    public function test_can_edit_user()
    {
        // Create a user to edit
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
        ]);
    
        // Update data
        $data = [
            'name' => 'Updated User',
            'email' => 'updateduser@example.com',
        ];
    
        // Submit the form to update the user
        $response = $this->put("/admin/users/{$user->id}", $data); // Adjust based on your route
    
        // Assert the user was updated
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated User',
            'email' => 'updateduser@example.com',
        ]);
    
        // Check for a redirect or successful response
        $response->assertRedirect('/admin/users');
    }
    
    public function test_can_delete_user()
    {
        // Create a user to delete
        $user = User::factory()->create();
    
        // Submit the request to delete the user
        $response = $this->delete("/admin/users/{$user->id}"); // Adjust based on your route
    
        // Assert the user was deleted
        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    
        // Check for a redirect or successful response
        $response->assertRedirect('/admin/users');
    }*/
    
}
