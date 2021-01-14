import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { IconButton } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { TicketData } from '../../types/types'

type Props = {
  ticket: TicketData
  onSubmit: (value: TicketData) => void
}

export default function EditTicketDialog(props: Props) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [url, setUrl] = React.useState('')

  const handleClickOpen = () => {
    setTitle(props.ticket.title)
    setDescription(props.ticket.description)
    setUrl(props.ticket.url)

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    props.onSubmit({
      id: props.ticket.id,
      roomId: props.ticket.roomId,
      title,
      description,
      url,
      doneAt: props.ticket.doneAt,
    })

    handleClose()
  }

  return (
    <div>
      <IconButton edge="end" aria-label="edit" onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">アイテムを追加</DialogTitle>
        <DialogContent>
          <DialogContentText>
            アイテムの詳細を入力してください
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="タイトル"
            type="text"
            fullWidth
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="詳細"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="URL"
            type="text"
            fullWidth
            value={url}
            onChange={(event) => {
              setUrl(event.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleSubmit} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
