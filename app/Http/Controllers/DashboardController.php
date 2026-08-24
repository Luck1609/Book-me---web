<?php

namespace App\Http\Controllers;

use App\Enums\UserTypeEnum;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return inertia(
            $user->hasRole(UserTypeEnum::CLIENT)
              ? 'client/dashboard'
              : 'provider/dashboard',
            []
        );
    }
}
