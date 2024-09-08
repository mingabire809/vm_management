<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'rateplan_id', 'starting_date', 'expiring_date'];


    public function rate_plan(){
        return $this->belongsTo(RatePlan::class, 'rateplan_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
