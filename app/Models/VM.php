<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VM extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'storage', 'ram', 'processor', 'user_id', 'status'];


    public function users(){
        return $this->belongsTo(User::class);
    }
}
