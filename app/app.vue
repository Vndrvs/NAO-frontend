<template>
  <Html lang="en">
		<Body>
			<NuxtLayout>
				<main>
					<NuxtRouteAnnouncer />
					<NuxtPage />
				</main>
				<ClientOnly>
					<ToastContainer />
				</ClientOnly>
			</NuxtLayout>
		</Body>
	</Html>
</template>
