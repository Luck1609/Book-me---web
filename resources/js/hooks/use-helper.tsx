import { router, usePage } from '@inertiajs/react';
import qs from 'query-string';
import { useMobileNavigation } from './use-mobile-navigation';

const useHelper = () => {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const { url } = usePage();

    const baseUrl = url.split('?')[0]
    const urlQuery = qs.parse(url.split('?')[1]);

    const query = qs.stringify(urlQuery, { skipEmptyString: true });

    const updateQuery = (name: string, value: string) => {
        const updatedQuery = { ...urlQuery };

        // Remove parameter if value is empty, otherwise set it
        if (!value || value.trim() === '') {
            delete updatedQuery[name];
        } else {
            updatedQuery[name] = value;
        }

        // Use the same approach as dashboard - return clean object for Inertia
        return updatedQuery;
    };

    const replaceUrlQueryParams = (name: string, value: string) => {
        const params = updateQuery(name, value);

        window.history.replaceState(urlQuery, '', `${baseUrl}?${qs.stringify(params, { skipEmptyString: true })}`)
    }
    // Handle export
    const handleExport = () => {
        // window.location.href = route(routeUrl, query);
    };

    function truncateByChar(str: string, maxLength: number) {
        if (str.length > maxLength) {
            return str.slice(0, maxLength) + '...';
        }

        return str;
    }

    return {
        updateQuery,
        truncateByChar,
        query,
        parsedQuery: urlQuery,
        handleExport,
        replaceUrlQueryParams,
        url,
        // getUserGroupRoute,
        logout: {
            handleLogout,
            cleanup
        },

        // userRole: user?.roles?.some((role) => role.name === RoleEnum.EMPLOYER)
        //     ? RoleEnum.EMPLOYER
        //     : user?.roles?.some((role) => role.name === RoleEnum.WORKER)
        //         ? RoleEnum.WORKER
        //         : null
    };
};

export default useHelper;
