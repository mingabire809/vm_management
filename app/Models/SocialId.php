<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialId extends Model
{
    use HasFactory;
    protected $fillable = ['social_id', 'user_id'];
}
