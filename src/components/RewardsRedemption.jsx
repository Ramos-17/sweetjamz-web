// These must match the backend's config/rewards.php rates (REWARD_REDEMPTION_POINTS_PER_DOLLAR /
// REWARD_FREE_PRODUCT_POINTS_COST). There's no public endpoint exposing them, so they're
// duplicated here — the backend is still the source of truth and validates independently.
const POINTS_PER_DOLLAR = 50;
const FREE_PRODUCT_POINTS_COST = 500;

export default function RewardsRedemption({ balance, subtotal, lines, redemption, onChange }) {
  const maxDiscountPoints = Math.min(
    Math.floor(balance / POINTS_PER_DOLLAR),
    Math.floor(subtotal)
  ) * POINTS_PER_DOLLAR;

  const canDiscount = maxDiscountPoints >= POINTS_PER_DOLLAR;
  const canFreeItem = balance >= FREE_PRODUCT_POINTS_COST;

  if (!canDiscount && !canFreeItem) {
    return null;
  }

  function setMode(mode) {
    if (mode === 'discount') {
      onChange({ mode, points: POINTS_PER_DOLLAR, productId: null });
    } else if (mode === 'free') {
      onChange({ mode, points: 0, productId: lines[0]?.product.id ?? null });
    } else {
      onChange({ mode: 'none', points: 0, productId: null });
    }
  }

  return (
    <div className="rewards-redemption">
      <h3>Use your points ({balance} available)</h3>

      <label className="checkbox-label">
        <input
          type="radio"
          name="redemption-mode"
          checked={redemption.mode === 'none'}
          onChange={() => setMode('none')}
        />
        Don't redeem points
      </label>

      {canDiscount && (
        <label className="checkbox-label">
          <input
            type="radio"
            name="redemption-mode"
            checked={redemption.mode === 'discount'}
            onChange={() => setMode('discount')}
          />
          Redeem points for a discount
        </label>
      )}

      {redemption.mode === 'discount' && (
        <div className="rewards-redemption-detail">
          <label>
            Points to redeem (in multiples of {POINTS_PER_DOLLAR}, $1 off per {POINTS_PER_DOLLAR})
            <input
              type="number"
              min={POINTS_PER_DOLLAR}
              max={maxDiscountPoints}
              step={POINTS_PER_DOLLAR}
              value={redemption.points}
              onChange={(e) =>
                onChange({ ...redemption, points: Number(e.target.value) })
              }
            />
          </label>
          <span>-${(redemption.points / POINTS_PER_DOLLAR).toFixed(2)} off</span>
        </div>
      )}

      {canFreeItem && (
        <label className="checkbox-label">
          <input
            type="radio"
            name="redemption-mode"
            checked={redemption.mode === 'free'}
            onChange={() => setMode('free')}
          />
          Redeem {FREE_PRODUCT_POINTS_COST} points for a free item
        </label>
      )}

      {redemption.mode === 'free' && (
        <div className="rewards-redemption-detail">
          <label>
            Free item
            <select
              value={redemption.productId ?? ''}
              onChange={(e) => onChange({ ...redemption, productId: e.target.value })}
            >
              {lines.map((line) => (
                <option key={line.product.id} value={line.product.id}>
                  {line.product.name} (${line.product.price.toFixed(2)})
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
}
