import { Context } from 'runed';
import { ZxcvbnFactory, type Score, type ZxcvbnResult } from '@zxcvbn-ts/core';
import * as zxcvbnCommon from '@zxcvbn-ts/language-common';

/** zxcvbn's own 0–4 scale. */
export type PasswordScore = Score;

export const PASSWORD_STRENGTH_LABELS = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];

// weak → strong: red → amber → lime → green
export const PASSWORD_STRENGTH_COLORS = [
	'bg-red-500',
	'bg-red-500',
	'bg-amber-500',
	'bg-lime-500',
	'bg-green-500'
];

// the dictionaries are large, so the estimator is built once, on first use
let estimator: ZxcvbnFactory | null = null;
function getEstimator() {
	estimator ??= new ZxcvbnFactory({
		dictionary: { ...zxcvbnCommon.dictionary },
		graphs: zxcvbnCommon.adjacencyGraphs
	});
	return estimator;
}

export type PasswordRootStateProps = {
	readonly id: string;
	value: string;
	readonly minScore: PasswordScore | undefined;
};

export class PasswordRootState {
	visible = $state(false);

	constructor(readonly opts: PasswordRootStateProps) {}

	get id() {
		return this.opts.id;
	}

	get value() {
		return this.opts.value;
	}

	set value(v: string) {
		this.opts.value = v;
	}

	/** `$derived` is lazy, so zxcvbn only runs where a Strength part (or `minScore`) reads it. */
	readonly result = $derived.by<ZxcvbnResult | null>(() =>
		this.opts.value ? getEstimator().check(this.opts.value) : null
	);

	get score(): PasswordScore | null {
		return this.result?.score ?? null;
	}

	/** `true` when no `minScore` was set, or the current score reaches it. */
	get meetsMinScore() {
		if (this.opts.minScore === undefined) return true;
		return (this.score ?? -1) >= this.opts.minScore;
	}

	toggleVisibility = () => {
		this.visible = !this.visible;
	};
}

const ctx = new Context<PasswordRootState>('Password.Root');

export function setPasswordRoot(props: PasswordRootStateProps) {
	return ctx.set(new PasswordRootState(props));
}

export function usePasswordRoot() {
	return ctx.get();
}
