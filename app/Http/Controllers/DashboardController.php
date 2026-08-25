<?php

namespace App\Http\Controllers;

use App\Actions\Provider\GetProviderDashboard;
use App\Enums\UserTypeEnum;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request, GetProviderDashboard $getProviderDashboard): Response
    {
        $user = $request->user();

        abort_unless($user instanceof User, 401);

        if ($user->hasRole(UserTypeEnum::CLIENT)) {
            return inertia('client/dashboard');
        }

        $providerProfile = $user->providerProfile()->firstOrFail();
        Gate::authorize('view', $providerProfile);

        return inertia('provider/dashboard', $getProviderDashboard($providerProfile));
    }
}
