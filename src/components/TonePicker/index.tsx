import { Chip, Stack, Typography } from '@mui/material'
import type { ShowTone } from '../../types/podcast'
import { toneConfig, toneOrder } from '../../utils/showOptions'

type TonePickerProps = {
  value: ShowTone
  onChange: (tone: ShowTone) => void
}

export default function TonePicker(props: TonePickerProps) {
  const { value, onChange } = props

  return (
    <>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
        {toneOrder.map((tone) => {
          const selected = tone === value

          return (
            <Chip
              key={tone}
              label={toneConfig[tone].label}
              clickable
              onClick={() => onChange(tone)}
              variant={selected ? 'filled' : 'outlined'}
              color={selected ? 'primary' : 'default'}
              sx={{ fontWeight: 600, px: 0.5 }}
            />
          )
        })}
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {toneConfig[value].hint}
      </Typography>
    </>
  )
}