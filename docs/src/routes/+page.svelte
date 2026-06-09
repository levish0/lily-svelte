<script lang="ts">
	const components = [
		{ name: 'Button', href: '/button', description: '클릭 가능한 인터랙티브 요소' },
		{ name: 'Card', href: '/card', description: '콘텐츠를 담는 컨테이너' },
		{ name: 'Badge', href: '/badge', description: '태그, 라벨, 상태 표시' },
		{ name: 'Avatar', href: '/avatar', description: '사용자 프로필 이미지' },
		{ name: 'Separator', href: '/separator', description: '콘텐츠를 구분하는 선' }
	];
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold tracking-[-0.72px]">lily</h1>
		<p class="text-sm leading-[1.6] tracking-[-0.39px] text-(--text)/48">
			levish.ac 디자인 언어 기반 Svelte 컴포넌트 라이브러리
		</p>
	</div>

	<div class="grid grid-cols-3 gap-3">
		{#each components as { name, href, description }}
			<a
				{href}
				class="blog-post-link flex flex-col gap-1 rounded-3xl bg-(--bg-elevated) p-5 transition-colors duration-150 hover:bg-(--text)/4"
			>
				<span class="text-sm font-medium tracking-[-0.39px]">{name}</span>
				<span class="text-xs tracking-[-0.3px] text-(--text)/48">{description}</span>
			</a>
		{/each}
	</div>
</div>
