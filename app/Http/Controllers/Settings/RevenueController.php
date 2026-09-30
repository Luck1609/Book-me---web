<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RevenueController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return inertia('settings/provider/revenue/index', []);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }
}
