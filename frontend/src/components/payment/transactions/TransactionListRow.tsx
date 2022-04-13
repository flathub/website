import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { Transaction } from '../../../types/Payment'
import Button from '../../Button'
import TransactionCancelButton from './TransactionCancelButton'
import styles from './TransactionListRow.module.scss'

interface RowProps {
  transaction: Transaction
}

const TransactionListRow: FunctionComponent<RowProps> = ({ transaction }) => {
  const { t, i18n } = useTranslation()

  const { created, updated, kind, value, status } = transaction

  // Status may change through interaction
  const [shownStatus, setStatus] = useState(status)

  const prettyCreated = new Date(created * 1000).toLocaleString()
  const prettyUpdated = new Date(updated * 1000).toLocaleString()
  const prettyValue = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
  }).format(value / 100)

  const needsAttention = ['new', 'retry'].includes(shownStatus)

  // Date object expects milliseconds since epoch
  return (
    <tr className={styles.row}>
      <td>{prettyCreated}</td>
      <td>{prettyUpdated}</td>
      <td>{kind}</td>
      <td>{prettyValue}</td>
      <td>{status}</td>
      <td className={styles.actions}>
        <Link
          href={`/payment/${
            needsAttention ? transaction.id : `details/${transaction.id}`
          }`}
          passHref
        >
          <Button type={needsAttention ? 'primary' : 'secondary'}>
            {needsAttention ? t('checkout') : t('view')}
          </Button>
        </Link>
        {needsAttention ? (
          <TransactionCancelButton
            id={transaction.id}
            onSuccess={() => setStatus('cancelled')}
          />
        ) : (
          <></>
        )}
      </td>
    </tr>
  )
}

export default TransactionListRow
