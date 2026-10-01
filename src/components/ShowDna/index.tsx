import { Box, Typography } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import type { NewShow } from '../../types/podcast'
import { toneConfig } from '../../utils/showOptions'

type ShowDnaProps = {
  show: NewShow
}

export default function ShowDna(props: ShowDnaProps) {
  const { show } = props
  const { audience, tone, hostPersona, coverColor } = show

  const items = [
    { label: 'Audience', value: audience, icon: <GroupsIcon /> },
    { label: 'Tone', value: `${toneConfig[tone].label} · ${toneConfig[tone].hint}`, icon: <GraphicEqIcon /> },
    { label: 'Host persona', value: hostPersona, icon: <RecordVoiceOverIcon /> },
  ]

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 1.5,
      }}
    >
      {items.map((item) => (
        <Box
          key={item.label}
          sx={{
            p: 2,
            display: 'flex',
            gap: 1.5,
            borderRadius: '12px',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'rgba(255, 255, 255, 0.03)',
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: `${coverColor}22`,
              color: coverColor,
            }}
          >
            {item.icon}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', lineHeight: 1.6 }}>
              {item.label}
            </Typography>
            <Typography variant="body2" color={item.value ? 'text.primary' : 'text.secondary'}>
              {item.value || 'Not set yet'}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}