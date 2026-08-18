<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OnboardingController extends Controller
{
  public function index()
  {
    return inertia('onboarding/index');
  }

  public function store()
}
