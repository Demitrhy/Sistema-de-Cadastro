import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Table, message } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import ModalEditarLoteProduto from './editarLoteProduto';
import { getPedidoComLotes } from '../../../services/apiservices';


function EditarLote(props: any) {
	const [pedido, setPedido] = useState("");
	const [filial, setFilial] = useState("");
	const [row, setRow] = useState();
	const [loading, setLoading] = useState(false);
	const [itensPedidoDireto, setItensPedidoDireto] = useState<Array<any>>();

	const columns = [
		{
			title: 'Produto',
			dataIndex: 'descricaoProduto',
			key: 'descricaoProduto',
			align: 'center' as 'center',
			width: '65%',
		},
		{
			title: 'Quantidade',
			dataIndex: 'quantidadeAtendida',
			key: 'quantidadeAtendida',
			align: 'center' as 'center',
			width: '20%',
		},
		{
			title: '',
			key: 'action',
			align: 'center' as 'center',
			width: '15%',
			render: (text, record) => (
				<div>
					<Space size="middle">
						<Button type="link"
							onClick={() => {
								setRow(record);
							}}
							icon={<EditOutlined />}
							style={{ marginRight: 10 }}
						/>
					</Space>
				</div>
			)
		}
	];

	function buscar() {
		setLoading(true);

		if (pedido.length >= 8 && filial.length > 0) {
			let juliana = pedido.substring(0, 7);
			let sq = pedido.replace(juliana, "");

			getPedidoComLotes(juliana, sq, filial)
				.then((pedido) => {
					setItensPedidoDireto(pedido.data);
				})
				.catch((error) => {
					message.error(error.response.data.Message)
				})
				.finally(() => {
					setLoading(false);
				})
		}
	}

	return (
		<>
			<Row>
				<Col>
					{`Pedido`}
					<Input
						type='number'
						onChange={(e) => setPedido(e.target.value)} />
				</Col>
				<Col style={{ marginLeft: '1em' }}>
					{`Filial`}
					<Input
						type='number'
						onChange={(e) => setFilial(e.target.value)} />
				</Col>
				<Col style={{ marginLeft: '1em' }}>
					<Button
						style={{ marginTop: '1.55em' }}
						onClick={buscar}
						disabled={pedido.length < 8 || filial.length <= 0}
						icon={<SearchOutlined />}
						type="primary">
						Buscar
					</Button>
				</Col>
			</Row>

			<Table
				title={() =>
					<div style={{ textAlign: 'center', fontSize: '15px' }}>
						Produtos com lotes
					</div>}
				dataSource={itensPedidoDireto}
				columns={columns}
				loading={loading}
				style={{ marginTop: '1em' }} />

			{row &&
				<ModalEditarLoteProduto
					onClose={() => {
						setRow(undefined);
						buscar();
					}}
					icone={<EditOutlined />}
					produto={row}
					pedido={pedido}
				/>
			}
		</>

	);
}

export default EditarLote;


