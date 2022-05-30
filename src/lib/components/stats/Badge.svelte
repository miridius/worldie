<script lang="ts">
	export let value: number;
	export let text: string;
</script>

<div class="flex flex-col items-center w-14">
	<span class="font-semibold text-lg leading-snug">{value}</span>
	<span class="font-light text-xs break-words text-center leading-none">{text}</span>
</div>
