import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setActivePeriod } from '../store/periodMenuSlice'
import Box from './Box'
import Label from './Label'
import Button from './Button'
import { PERIODS } from '../helpers/constants'

const MenuItem = ({ period, active }) => {
  const dispatch = useDispatch()

  return <Button
    border={1}
    borderRadius={3}
    borderColor={active ? "green" : "placeholder"}
    backgroundColor={active && "green"}
    padding={8}
    onPress={() => dispatch(setActivePeriod(period))}
  >
    <Label fontSize={10} color={active ? "white" : "placeholder"}>{period.name}</Label>
  </Button>
}

const PeriodMenu = ({ ...props }) => {
  const { periodMenu } = useSelector((state) => state.periodMenu)

  return <Box
    flexDirection="row"
    justifyContent="space-evenly"
    alignItems="center"
    px={24}
    {...props}
  >
    <MenuItem period={PERIODS.daily} active={periodMenu.slug == PERIODS.daily.slug} />
    <MenuItem period={PERIODS.weekly} active={periodMenu.slug == PERIODS.weekly.slug} />
    <MenuItem period={PERIODS.monthly} active={periodMenu.slug == PERIODS.monthly.slug} />
    <MenuItem period={PERIODS.all} active={periodMenu.slug == PERIODS.all.slug} />
  </Box>
}

export default PeriodMenu