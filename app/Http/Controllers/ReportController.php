<?php

namespace App\Http\Controllers;

use App\Actions\Provider\GetProviderReport;
use App\Http\Requests\ReportRequest;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(ReportRequest $request, GetProviderReport $getProviderReport): Response
    {
        /** @var User $provider */
        $provider = $request->user();
        abort_unless($provider instanceof User, 401);
        Gate::authorize('viewAny', Booking::class);

        $providerProfile = $provider->providerProfile()->firstOrFail();
        $filters = $request->validated();
        $period = $filters['period'] ?? '30d';
        $report = $getProviderReport(
            $providerProfile,
            $period,
            $filters['start_date'] ?? null,
            $filters['end_date'] ?? null,
        );

        return Inertia::render('provider/report/index', [
            'report' => $report,
            'filters' => [
                'period' => $period,
                'start_date' => $report['date_range']['start_date'],
                'end_date' => $report['date_range']['end_date'],
            ],
        ]);
    }
}
