<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationsController extends Controller
{
    /**
     * Show the authenticated user's unread notifications.
     */
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        return Inertia::render('notifications/index', [
            'notifications' => $user->unreadNotifications()
                ->latest()
                ->limit(50)
                ->get(['id', 'type', 'data', 'created_at']),
            'unreadNotificationCount' => $user->unreadNotifications()->count(),
        ]);
    }
}
