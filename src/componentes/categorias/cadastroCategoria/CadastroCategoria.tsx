import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'

import { buscaId, post, put } from '../../../service/Service'
import Categoria from '../../../models/Categoria'

import "./CadastroCategoria.css"

function CadastroCategoria() {

    let history = useHistory()

    const { id } = useParams<{ id: string }>()

    const [token, setToken] = useLocalStorage('token')

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        nomec:'',
        descricaoc: ''
    })

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado")
            history.push("/login")
        }
    }, [token])

    async function findById(id: string) {
        await buscaId(`/categorias/${id}`, setCategoria, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value,
            
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {

            try {
                setCategoria({
                    ...categoria,
                    produto:[{}]
                })

                await put('/categoria', categoria, setCategoria, {
                    headers: {
                        'Authorization': token
                    }
                })

                alert('Categoria atualizado com sucesso');

            } catch (error) {
                console.log(`Error: ${error}`)
                alert("Erro, por favor verifique a quantidade minima de caracteres")
            }

        } else {

            try {
                await post(`/categoria`, categoria, setCategoria, {
                    headers: {
                        'Authorization': token
                    }
                })
                
                alert('Categoria cadastrado com sucesso');
                
            } catch (error) {
                console.log(`Error: ${error}`)
                alert("Erro, por favor verifique a quantidade minima de caracteres")
            }
        }
        
        back()

    }

    function back() {
        history.push('/categorias')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro categoria</Typography>
                <TextField
                value={categoria.nomec}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    id="nomec"
                    label="nomec"
                    variant="outlined"
                    name="nomec"
                    margin="normal"
                    fullWidth
                />

                    <TextField
                    value={categoria.descricaoc}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    id="descricaoc"
                    label="descricaoc"
                    variant="outlined"
                    name="descricaoc"
                    margin="normal"
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroCategoria