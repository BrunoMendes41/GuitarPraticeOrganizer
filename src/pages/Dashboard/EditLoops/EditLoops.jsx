import React from 'react'
import Input from '../../../components/molecules/Input/Input'
import Button from '../../../components/atoms/Button/Button'
import Modal from '../../../components/molecules/Modal/Modal'
import { convertToSeconds } from '../../../utils/utils'

// icones font awesome
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

import { FlexContainer, ButtonWrapper, Title } from './style'

function EditLoops({ loops, _id, modal, setModal, apiRequest }) {
  const [newLoops, setNewLoops] = React.useState([])
  const [title, setTitle] = React.useState('')
  const [start, setStart] = React.useState('00:00')
  const [end, setEnd] = React.useState('00:00')

  console.log(newLoops)

  const handleAddLoop = (event) => {
    event.preventDefault()
    const newLoop = {
      title,
      start: convertToSeconds(start),
      end: convertToSeconds(end),
    }
    setNewLoops([newLoop, ...newLoops])
  }

  const deleteLoop = (loopIndex) => {
    const removeLoop = newLoops[loopIndex]
    const loopsAfterRemove = newLoops.filter((loop) => loop != removeLoop)
    setNewLoops(loopsAfterRemove)
  }

  const handleSave = () => {
    apiRequest.updateLoops(_id, newLoops)
    setModal(false)
  }

  React.useEffect(() => {
    setNewLoops(loops)
  }, [loops])

  return (
    <Modal isModalOpen={modal} setModalOpen={setModal} noImg={true}>
      <Title>Novo Loop</Title>
      <form onSubmit={handleAddLoop}>
        <FlexContainer>
          <Input
            label="Ínicio"
            type="text"
            value={start}
            onChange={({ target }) => {
              setStart(target.value)
            }}
            placeholder="00:00"
            required
            pattern="([0-5][0-9]):[0-5][0-9]"
          />

          <Input
            label="Fim (Opcional)"
            value={end}
            onChange={({ target }) => {
              setEnd(target.value)
            }}
            step="1"
            placeholder="00:00"
            pattern="([0-5][0-9]):[0-5][0-9]"
          />

          <Input
            label="Título"
            type="text"
            value={title}
            onChange={({ target }) => {
              setTitle(target.value)
            }}
            required
          />
        </FlexContainer>
        <Button type="submit" color="--success-color">
          Adicionar &nbsp;
          <Icon icon={faPlus} />
        </Button>
      </form>

      {newLoops.length > 0 ? (
        <>
          <Title>Deletar Loops</Title>
          <FlexContainer>
            {newLoops.map((loop, i) => (
              <Button
                key={i}
                color="--error-color"
                onClick={() => {
                  deleteLoop(i)
                }}
              >
                {loop.title} &nbsp;
                <Icon icon={faTrash} />
              </Button>
            ))}
          </FlexContainer>
        </>
      ) : null}

      <ButtonWrapper>
        <Button color="--info-color" onClick={handleSave}>
          Salvar Alterações
        </Button>
        <Button
          onClick={() => {
            setModal(false)
          }}
          color="--error-color"
        >
          Cancelar
        </Button>
      </ButtonWrapper>
    </Modal>
  )
}

export default EditLoops
