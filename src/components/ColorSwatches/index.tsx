import { ButtonBase, Stack } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { coverColors } from '../../utils/showOptions'

type ColorSwatchesProps = {
  value: string
  onChange: (color: string) => void
}

export default function ColorSwatches(props: ColorSwatchesProps) {
  const { value, onChange } = props

  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
      {coverColors.map((color) => {
        const selected = color === value

        return (
          <ButtonBase
            key={color}
            aria-label={`Cover color ${color}`}
            aria-pressed={selected}
            onClick={() => onChange(color)}
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              color: '#fff',
              background: `linear-gradient(135deg, ${color}, ${color}99)`,
              boxShadow: selected ? `0 0 0 3px #151524, 0 0 0 5px ${color}` : 'none',
              transition: 'transform 0.15s, box-shadow 0.15s',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          >
            {selected && <CheckIcon fontSize="small" />}
          </ButtonBase>
        )
      })}
    </Stack>
  )
}