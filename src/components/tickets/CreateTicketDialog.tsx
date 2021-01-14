import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

type Props = {
  onSubmit: (value: { title: string; description: string; url: string }) => void
}

export default function CreateTicketDialog(props: Props) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [url, setUrl] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    props.onSubmit({
      title,
      description,
      url,
    })

    handleClose()
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        + 追加
      </Button>
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
            作成
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
