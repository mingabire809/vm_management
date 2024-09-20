<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Subscription extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = ['user_id', 'rateplan_id', 'starting_date', 'expiring_date', 'child_account'];

    protected $auditInclude = [
        'user_id',
        'rateplan_id',
        'starting_date',
        'expiring_date',
        'child_account'
    ];

    protected $casts = [
        'child_account' => 'array'
    ];
    
    public function rate_plan(){
        return $this->belongsTo(RatePlan::class, 'rateplan_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
