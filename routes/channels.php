<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('management.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
