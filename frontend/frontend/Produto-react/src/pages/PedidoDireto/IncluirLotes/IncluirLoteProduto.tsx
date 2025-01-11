import React, { useEffect, useState } from 'react';
import { Drawer, Button, Row, Table, Col, Input, Divider, message, Card, Space } from 'antd';
import { Lote, LotesPorProduto, ProdutoSemLote } from '../../../store/PedidoDireto/PedidoDireto';
import { DeleteOutlined } from '@ant-design/icons';
import { getLotesPorProduto, putCadastroLotesProduto } from '../../../services/apiservices';

function ModalIncluirLoteProduto(props: any) {
	const [lote, setLote] = useState('');
	const [dataFabricacao, setDataFabricacao] = useState('');
	const [dataVencimento, setDataVencimento] = useState('');
	const [quantidadeItem, setQuantidadeItem] = useState('');
	const [lotes, setLotes] = useState<Array<Lote>>([]);
	const [desabilitarInclusao, setDesabilitarInclusao] = useState(true);
	const [produtosSemLote, setProdutosSemLote] = useState<ProdutoSemLote>();
	const [lotesPorProduto, setLotesPorProduto] = useState<Array<LotesPorProduto>>([]);

	const onClose = () => {
		props.onClose();
	};

	const columns = [
		{
			title: 'Lote',
			dataIndex: 'lote',
			key: 'lote',
			align: 'center' as 'center',
			width: '20%',
		},
		{
			title: 'Data fabricação',
			dataIndex: 'dataFabricacao',
			key: 'dataFabricacao',
			align: 'center' as 'center',
			width: '20%',
		},
		{
			title: 'Data vencimento',
			dataIndex: 'dataVencimento',
			key: 'dataVencimento',
			align: 'center' as 'center',
			width: '20%',
		},
		{
			title: 'Quantidade item',
			dataIndex: 'quantidadeItem',
			key: 'quantidadeItem',
			align: 'center' as 'center',
			width: '20%',
		},
		{
			title: 'Apagar',
			dataIndex: 'x',
			key: 'x',
			align: 'center' as 'center',
			width: '20%',
			render: (text: any, record: any) => (
				<div>
					<Space size="middle">
						<DeleteOutlined style={{ color: "red" }} onClick={(e) => tirarLoteLista(record.key)} />
					</Space>
				</div>
			)
		},
	]

	function tirarLoteLista(lote: string) {
		let lotesAtuais = [...lotes];
		var filtered = lotesAtuais.filter(function (l) { return l.lote != lote });

		if (filtered.length > 0) {
			setLotes(filtered?.map((row: any) => {
				return {
					...row,
					key: row.lote,
					dataFabricacao: row.dataFabricacao,
					dataVencimento: row.dataVencimento,
					quantidadeItem: row.quantidadeItem,
					lote: row.lote
				};
			}))
		}
		else
			setLotes([])
	}

	function onChangeLote(lote: string) {
		setLote(lote);
	}

	function onChangeDataFabricacao(dataFabricacao: string) {
		setDataFabricacao(dataFabricacao);

		if (dataFabricacao.length > 4)
			message.warn("Data fabricação pode ter mais que 4 dígitos.")
		else if (dataFabricacao.length == 4) {
			let mes = parseInt(dataFabricacao.substr(0, 2));
			let ano = parseInt(dataFabricacao.substr(2, 2));

			if (isNaN(mes) || mes > 12 || mes < 1) {
				message.warn("O mês informado na data de fabricação é inválido. Favor, corrija-o.")
				setDataFabricacao('');

			}
		} else
			setDataFabricacao(dataFabricacao)
	}

	function onChangeDataVencimento(dataVencimento: string) {
		setDataVencimento(dataVencimento);

		if (dataVencimento.length > 4)
			message.warn("Data vencimento não pode ter mais que 4 dígitos.")
		else if (dataVencimento.length == 4) {
			let mes = parseInt(dataVencimento.substr(0, 2));

			if (isNaN(mes) || mes > 12 || mes < 1) {
				message.warn("O mês informado na data de vencimento é inválido. Favor, corrija-o.")
				setDataVencimento('');
			}
		} else
			setDataVencimento(dataVencimento);
	}

	function onChangeQuantidadeItem(quantidadeItem: string) {
		setQuantidadeItem(quantidadeItem);
	}

	useEffect(() => {
		if (dataFabricacao.length == 4 && dataVencimento.length == 4) {
			let hoje = new Date();
			let sufixoAno = hoje.getFullYear().toString().substr(0, 2);

			let mesFab = parseInt(dataFabricacao.substr(0, 2));
			let anoFab = parseInt(`${sufixoAno}${dataFabricacao.substr(2, 2)}`);
			let mesVenc = parseInt(dataVencimento.substr(0, 2));
			let anoVenc = parseInt(`${sufixoAno}${dataVencimento.substr(2, 2)}`);

			let dtFabricacao = new Date(anoFab, mesFab - 1, 1);
			let dtVencimento = new Date(anoVenc, mesVenc - 1, 1);

			if (dtFabricacao >= dtVencimento) {
				message.warn("Data de fabricação precisa ser menor que a de vencimento.");
				setDataFabricacao('');
				setDataVencimento('')
			}
			// else if (dtFabricacao > hoje) {
			// 	message.warn("Data de fabricação não pode ser maior que a data atual.");
			// 	setDataFabricacao('');
			// 	setDataVencimento('')
			// }
			else if (anoVenc < hoje.getFullYear()) {
				message.warn("Ano da data de vencimento é menor que o atual.");
				setDataFabricacao('');
				setDataVencimento('')
			}
		}

	}, [dataFabricacao, dataVencimento])

	useEffect(() => {
		if (lote.length > 0 && dataFabricacao.length == 4 && dataVencimento.length == 4 && parseInt(quantidadeItem) > 0)
			setDesabilitarInclusao(false);
		else
			setDesabilitarInclusao(true)
	}, [lote, dataFabricacao, dataVencimento, quantidadeItem]);

	useEffect(() => {
		if (lotesPorProduto.length > 0) {
			let existeLote = lotesPorProduto.find(l => l.lote.toUpperCase() == lote.toUpperCase() && l.fabricacao == dataFabricacao && l.vencimento == dataVencimento) != undefined;
			if (existeLote) {
				let lotesAtuais = [...lotes];

				if (lote && dataFabricacao && dataVencimento && quantidadeItem) {
					lotesAtuais.push({
						lote: lote,
						dataFabricacao: dataFabricacao,
						dataVencimento: dataVencimento,
						quantidadeItem: parseInt(quantidadeItem)
					})

					setLotes(lotesAtuais?.map((row: any) => {
						return {
							...row,
							key: row.lote,
							dataFabricacao: row.dataFabricacao,
							dataVencimento: row.dataVencimento,
							quantidadeItem: row.quantidadeItem,
							lote: row.lote
						};
					}))
				}
			}else{
				message.warning("Lote informado é inválido!")
			}
		}
	}, [lotesPorProduto]);


	function inserirListaLotes() {
		getLotesPorProduto(props.row.codigoProduto)
			.then((lotes) => {
				if(lotes.data.length > 0){
					setLotesPorProduto(lotes.data)
				}else{
					message.warning("Produto sem lotes cadastrados.")
				}
			})

	}

	function limparCampos() {
		setLote('');
		setDataFabricacao('');
		setDataVencimento('');
		setQuantidadeItem('');
		setLotes([]);
	}

	function cadastrarLotes() {
		setProdutosSemLote({
			...produtosSemLote,
			codigoDeposito: props.row.codigoDeposito,
			codigoProduto: props.row.codigoProduto,
			id: props.row.id,
			nomeFantasiaDeposito: props.row.nomeFantasiaDeposito,
			numeroPedido: props.row.numeroPedido,
			quantidadePedida: props.row.quantidadePedida,
			sequencialPedido: props.row.sequencialPedido,
			codigoProdutoDv: props.row.codigoProdutoDv,
			descricaoProduto: props.row.descricaoProduto,
			idEnderecoProdutoDeposito: props.row.idEnderecoProdutoDeposito,
			codigoFilial: props.row.codigoFilial,
			dataCadastro: props.row.dataCadastro,
			lotes: lotes
		})
	}

	useEffect(() => {
		if (produtosSemLote) {
			putCadastroLotesProduto(produtosSemLote)
				.then((resultado) => {
					message.success("Lote(s) cadastrado(s) com sucesso!");
					onClose();
				})
				.catch((error) => {
					message.error(error.response.data.Message)
				})

		}
	}, [produtosSemLote]);

	useEffect(() => {
		console.log(props.produtosSemLote);
	}, [])


	return (
		<>
			<Drawer
				width={620}
				visible={true}
				onClose={onClose}
				footer={
					<div
						style={{ textAlign: 'right' }}>
						<Button onClick={onClose} style={{ marginRight: 8 }}>
							Sair
						</Button>
						<Button onClick={cadastrarLotes} disabled={lotes.length > 0 ? false : true} type="primary">
							Cadastrar lotes
						</Button>
					</div>
				}>

				<Card title="Informações do produto"
					size="small"
					style={{ textAlign: "center", backgroundColor: '#FFF1D6', width: 37 + 'em' }}>
					<Card.Grid hoverable style={{ width: 25 + '%', padding: 9, textAlign: 'center' }}>
						{`Pedido: `}<br />
						{`${props.row.numeroPedido}-${props.row.sequencialPedido}`}
					</Card.Grid>

					<Card.Grid hoverable style={{ width: 25 + '%', padding: 9, textAlign: 'center' }}>
						{`Depósito: `}<br />
						{`${props.row.codigoDeposito}`}
					</Card.Grid>

					<Card.Grid hoverable style={{ width: 25 + '%', padding: 9, textAlign: 'center' }}>
						{`Produto: `}<br />
						{`${props.row.codigoProdutoDv}`}
					</Card.Grid>

					<Card.Grid hoverable style={{ width: 25 + '%', padding: 9, textAlign: 'center' }}>
						{`Qtd. pedida: `}<br />
						{`${props.row.quantidadePedida}`}
					</Card.Grid>
					<div style={{ textAlign: "center", width: '100%', paddingTop: '3.5em', paddingBottom: '0.5em' }}>
						{``}<br />
						{`${props.row.descricaoProduto}`}
					</div>
				</Card>


				<Row style={{ paddingBottom: 15, paddingTop: 15, marginLeft: 23, lineHeight: -0.4285 }}>
					<Col style={{ marginRight: 10 }} span={60}>
						<div style={{ marginLeft: -17 }}>
							<h4 style={{ marginTop: 10 }}> Lote do produto: </h4>
							<Input value={lote}
								onChange={(e) => onChangeLote(e.target.value)}
								type="text"
								style={{ width: 17.5 + 'em' }}
								placeholder="Digite o lote do produto" />
						</div>
						<div style={{ marginLeft: -17 }}>
							<h4 style={{ marginTop: 10 }}> Data de fabricação: </h4>
							<Input value={dataFabricacao}
								onChange={(e) => onChangeDataFabricacao(e.target.value)}
								type="number"
								style={{ width: 17.5 + 'em' }}
								placeholder="Ex.: 0120" />
						</div>

					</Col>

					<Col>
						<div style={{ marginLeft: 10 }}>
							<h4 style={{ marginTop: 10 }}> Quantidade item: </h4>
							<Input value={quantidadeItem}
								onChange={(e) => onChangeQuantidadeItem(e.target.value)}
								type="number"
								style={{ width: 17.5 + 'em' }}
								placeholder="Digite a qtd. do item" />
						</div>
						<div style={{ marginLeft: 10 }}>
							<h4 style={{ marginTop: 10 }}> Data de vencimento: </h4>
							<Input value={dataVencimento}
								onChange={(e) => onChangeDataVencimento(e.target.value)}
								type="number"
								style={{ width: 17.5 + 'em' }}
								placeholder="Ex.: 0325" />
						</div>
					</Col>

					<Button type="primary"
						disabled={desabilitarInclusao}
						style={{ marginTop: 1.7 + 'em', width: 17.5 + 'em', marginLeft: -17 }}
						onClick={() => inserirListaLotes()}>Incluir na lista de lotes</Button>

					<Button type="danger"
						style={{ marginTop: 1.7 + 'em', width: 17.5 + 'em', marginLeft: 22 }}
						onClick={() => limparCampos()}>Limpar campos</Button>

				</Row>
				<Divider></Divider>

				<Table columns={columns}
					style={{ width: 37 + 'em' }}
					dataSource={[...lotes]}
					title={() => <div style={{ textAlign: "center", fontSize: 15 }}><b>Lotes a serem cadastrados</b></div>} />
			</Drawer>
		</>
	)
}

export default ModalIncluirLoteProduto;