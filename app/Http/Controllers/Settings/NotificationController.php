<?php

namespace App\Http\Controllers\Settings;

use App\Enums\UserTypeEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;

class NotificationController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request): Response
  {
    if ($request->user()->hasRole(UserTypeEnum::Client->value)) {
      return inertia('settings/client/notification', []);
    }

    $page = $request->query('target');

    return match ($page) {
      'automation' => inertia('settings/provider/notification/automation', [
        'target' => $page
      ]),
      default => inertia('settings/provider/notification/index', [
        'target' => $page
      ]),
    };
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
