import { UserType } from '@/types'
import { usePage } from '@inertiajs/react'
import React from 'react'
import ProviderNotificationSettings from './provider'
import ClientNotificationSettings from './client'

export default function NotificationSettings() {
	const { user } = usePage().props

	if (user.role === UserType.PROVIDER) {
		return <ProviderNotificationSettings />
	}

	return (
		<ClientNotificationSettings />
	)
}