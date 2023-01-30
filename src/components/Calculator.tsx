import React, { useState } from 'react'
import { Button, FormControl, FormHelperText, Grid, InputAdornment, OutlinedInput, ToggleButton, ToggleButtonGroup } from '@mui/material'
import BackspaceIcon from '@mui/icons-material/Backspace'
import styled from 'styled-components'

const CalculatorContainer = styled.div`
    max-width: 320px;
`

enum Operand {
    Div = "/", // gonna have to handle / vs ÷;
    Mult = "*", // gonna have to handle X vs &times; vs *
    Sub = "-",
    Add = "+",
}

const expressionRegex = /(\d|\.)+/g

const Calculator: React.FC = () => {
    const [expressionIsInvalid, setExpressionIsInvalid] = useState(false)
    const [selectedUnit, setSelectedUnit] = useState('Eth')
    const [expression, setExpression] = useState('')
    const [ethResult, setEthResult] = useState(0)
    const inputClearHandler = () => {
        setExpressionIsInvalid(false)
        setExpression('')
        setEthResult(0)
    }
    const inputBackspaceHandler = () => {
        if(expression.length > 0) {
            setExpressionIsInvalid(false)
            setExpression(prevState => {
                return prevState.substring(0, prevState.length - 1)
            })
        }
    }
    const buttonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const lastEntered = expression.slice(-1)
        const input = e.currentTarget.value
        setExpression(prevState => {
            // handle multiple successive operand inputs: just use most recent operand
            if(Object.values(Operand).includes(lastEntered as Operand) && Object.values(Operand).includes(input as Operand)){
                return prevState.substring(0, prevState.length - 1) + input
            }
            // Reject multiple decimal points within a single value
            if(input === '.'){
                const lastValue = prevState.match(expressionRegex)?.pop()
                return !lastValue?.includes('.') || Object.values(Operand).includes(lastEntered as Operand) ? prevState + input : prevState
            }
            return prevState + input
        })
    }
    const unitChangeHandler = (e: React.MouseEvent<HTMLElement>, newUnit: string) => {
        newUnit !== null && setSelectedUnit(newUnit)
        if(expression.match(expressionRegex)?.length === 1){
            const result = parseFloat(expression)
            setEthResult(newUnit === 'Eth' ? result : newUnit === 'Gwei' ? result / (10 ** 9) : result / (10 ** 18))
        }
    }
    const expressionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpression(e.target.value)
        setExpressionIsInvalid(false)
    }
    const evaluateExpressionHandler = () => {
        if(expression.length === 0){
            return
        }
        const safeExpression = /[^-()\d/*+.]/g
        if(safeExpression.test(expression)) {
            setExpressionIsInvalid(true)
            return
        }
        const result = eval?.(`"use strict";(${expression})`)
        setExpression(result.toString())
        setEthResult(selectedUnit === 'Eth' ? result : selectedUnit === 'Gwei' ? result / (10 ** 9) : result / (10 ** 18))
    }

    return(
        <CalculatorContainer>
            <Grid container spacing={2} justifyContent='center'>
                {ethResult !== 0 ? (
                    <Grid item xs={12}>
                        <p style={{textAlign: 'right'}}>
                            {ethResult.toLocaleString('en-US', {maximumFractionDigits: 18})} Eth <br />
                            {(ethResult * (10 ** 9)).toLocaleString('en-US', {maximumFractionDigits: 9})} Gwei <br />
                            {(ethResult * (10 ** 18)).toLocaleString('en-US', {maximumFractionDigits: 0})} Wei
                        </p>
                    </Grid>
                ) : null}
                <Grid item xs={12}>
                    <FormControl fullWidth variant='outlined'>
                        <OutlinedInput
                            id='result'
                            endAdornment={<InputAdornment position='end'>{selectedUnit}</InputAdornment>}
                            inputProps={{
                                'aria-label': 'result',
                                inputMode: 'numeric'
                            }}
                            value={expression}
                            onChange={expressionChangeHandler}
                            error={expressionIsInvalid}
                        />
                        {expressionIsInvalid ? <FormHelperText id="result-helper-text" error>Error! Check your input</FormHelperText> : null}
                    </FormControl>
                </Grid>
                <Grid item xs={12} textAlign='right'>
                    <ToggleButtonGroup
                        value={selectedUnit}
                        exclusive
                        onChange={unitChangeHandler}
                        aria-label='Select Ethereum unit'
                        >
                        <ToggleButton value='Eth' aria-label='eth'>
                            Eth
                        </ToggleButton>
                        <ToggleButton value='Gwei' aria-label='gwei'>
                            Gwei
                        </ToggleButton>
                        <ToggleButton value='Wei' aria-label='wei'>
                            Wei
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={9}>
                    <Button aria-label='clear' variant='outlined' style={{width: '100%'}} onClick={inputClearHandler}>Clear</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='divide' variant='outlined' value='/' onClick={(e) => buttonClickHandler(e)}>÷</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='7' variant='outlined' value='7' onClick={(e) => buttonClickHandler(e)}>7</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='8' variant='outlined' value='8' onClick={(e) => buttonClickHandler(e)}>8</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='9' variant='outlined' value='9' onClick={(e) => buttonClickHandler(e)}>9</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='multiply' variant='outlined' value='*' onClick={(e) => buttonClickHandler(e)}>X</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='4' variant='outlined' value='4' onClick={(e) => buttonClickHandler(e)}>4</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='5' variant='outlined' value='5' onClick={(e) => buttonClickHandler(e)}>5</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='6' variant='outlined' value='6' onClick={(e) => buttonClickHandler(e)}>6</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='minus' variant='outlined' value='-' onClick={(e) => buttonClickHandler(e)}>-</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='1' variant='outlined' value='1' onClick={(e) => buttonClickHandler(e)}>1</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='2' variant='outlined' value='2' onClick={(e) => buttonClickHandler(e)}>2</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='3' variant='outlined' value='3' onClick={(e) => buttonClickHandler(e)}>3</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='4' variant='outlined' value='+' onClick={(e) => buttonClickHandler(e)}>+</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='delete' variant='outlined' onClick={inputBackspaceHandler}><BackspaceIcon /></Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='0' variant='outlined' value='0' onClick={(e) => buttonClickHandler(e)}>0</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='point' variant='outlined' value='.' onClick={(e) => buttonClickHandler(e)}>.</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button aria-label='equals' variant='contained' onClick={evaluateExpressionHandler}>=</Button>
                </Grid>
            </Grid>
        </CalculatorContainer>
    )
}

export default Calculator