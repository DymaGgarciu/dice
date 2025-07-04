import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { GameResult } from '../../types/game';

interface CustomHistoryTableProps {
  history: GameResult[];
}

const cellBodySx = {
  fontFamily: 'Roboto, Arial, sans-serif',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: 1.43,
  letterSpacing: '0.17px',
  color: 'var(--text-primary, #000000DE)',
  background: 'none',
};

const cellHeadSx = {
  fontFamily: 'Roboto, Arial, sans-serif',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '24px',
  letterSpacing: '0.17px',
  color: 'var(--text-primary, #000000DE)',
  background: 'none',
};

export const CustomHistoryTable: React.FC<CustomHistoryTableProps> = React.memo(({ history }) => (
  <TableContainer sx={{ width: 600, boxShadow: 'none', background: 'none' }}>
    <Table sx={{ width: 600, background: 'none' }}>
      <TableHead>
        <TableRow
          sx={{
            height: 56,
            borderBottom: '1px solid var(--divider, #0000001F)',
            opacity: 1,
          }}
        >
          <TableCell sx={{ ...cellHeadSx, borderBottom: 'none' }}>Time</TableCell>
          <TableCell sx={{ ...cellHeadSx, borderBottom: 'none' }}>Guess</TableCell>
          <TableCell sx={{ ...cellHeadSx, borderBottom: 'none' }}>Result</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {history.map((row) => (
          <TableRow
            key={row.id}
            sx={{
              height: 32,
              borderBottom: '1px solid var(--divider, #0000001F)',
              opacity: 1,
            }}
          >
            <TableCell sx={{ ...cellBodySx, borderBottom: 'none' }}>{
              (typeof row.timestamp === 'string' ? new Date(row.timestamp) : row.timestamp).toLocaleTimeString()
            }</TableCell>
            <TableCell sx={{ ...cellBodySx, borderBottom: 'none' }}>
              {row.condition === 'greater' ? 'Over' : 'Under'} {row.threshold}
            </TableCell>
            <TableCell sx={{ ...cellBodySx, borderBottom: 'none' }}>
              <Typography
                component="span"
                sx={{ color: row.isWin ? '#2E7D32' : '#D32F2F', fontWeight: 500 }}
              >
                {row.result}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)); 