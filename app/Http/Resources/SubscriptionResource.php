<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class SubscriptionResource extends JsonResource
{
  
    public function toResponse($request)
    {
        
        return response()->json([
            'id' => $this->id,
            'name' => $this->rate_plan ? $this->rate_plan->name : null,
            'starting_date' => $this->starting_date,
            'expiring_date' => $this->expiring_date,
            'number_of_vm_allowed' => $this->rate_plan ? $this->rate_plan->number_of_vm_allowed : null,
            'number_of_backup_allowed' => $this->rate_plan ? $this->rate_plan->number_of_backup_allowed : null
        ], Response::HTTP_OK);
    }
}
