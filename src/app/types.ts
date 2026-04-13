// Enums gerados a partir do schema Prisma
export enum TipoDeArea {
  RL = "RL",
  UAS = "UAS",
  C = "C",
}

export enum CicloProducao {
  Anual = "Anual",
  Bianual = "Bianual",
  Bimestral = "Bimestral",
  Semestral = "Semestral",
}

export enum ComoCompensar {
  AquisicaoCota = "AquisicaoCota",
  Arrendamento = "Arrendamento",
  Doacao = "Doacao",
  Cadastramento = "Cadastramento",
}

// Interfaces geradas a partir dos models Prisma

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
  PlanoProdutivo: PlanoProdutivo[];
  RegularizacaoSanitaria?: RegularizacaoSanitaria;
  RegularizacaoAmbiental?: RegularizacaoAmbiental;
  RegularizacaoFundiaria?: RegularizacaoFundiaria;
}

export interface RegularizacaoFundiaria {
  id: string;
  possuiCafDap: boolean;
  cafDapComp?: string;
  possuiSigef: boolean;
  sigefComp?: string;
  registCartorioLote: boolean;
  possuiBaseTopoSigef: boolean;
  encontrouProfParaLevantamento: boolean;
  localizacao: string;
  ccirNoSncrDoIncra: boolean;
  ccirNoSncrDoIncraComp?: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegularizacaoAmbiental {
  id: string;
  possuiCar: boolean;
  carComp?: string;
  possuiReservaLegal: boolean;
  reservaLegalRegularizada: boolean;
  reservaLegalRegularizadaComp?: string;
  desejaRegReservaLegal: boolean;
  excedenteVegNatReservaLegal: boolean;
  comoCompensar: ComoCompensar;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegularizacaoSanitaria {
  id: string;
  licenca: boolean;
  licencaComp?: string;
  produtosAgricolas: string;
  controleDePragas: boolean;
  usaProdutosQuimicos: boolean;
  armazenamentoProdutos: string;
  tratamentoResiduoAgricolas: boolean;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanoProdutivo {
  id: string;
  endereco: string;
  tipoDeArea: TipoDeArea;
  dataInicioPlantio: Date;
  usaFertilizantes: boolean;
  usaPesticidas: boolean;
  hectare: number;
  linhas: number;
  espacamento: number;
  quantMudasFlorestais: number;
  quantMudasFrutiferas: number;
  calcario: number;
  adulboOrganico: number;
  especiesMudasFlorestais: string[];
  especiesMudasFlorestaisOutro?: string;
  especiesMudasFrutiferas: string[];
  especiesMudasFrutiferasOutro?: string;
  clicloProducao: CicloProducao;
  lat: string;
  lng: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Produtor {
  id: string;
  nome: string;
  endereco: string;
  ano: number;
  areas: string[];
  pfp: string;
  email: string;
  telefone: string;
  images: string[];
  tituloDescricao: string;
  descricao: string;
  hectare: number;
  quantMudasFlorestais: number;
  quantMudasFrutiferas: number;
  quantMudasIndustriais: number;
  especiesMudasFlorestais: string[];
  especiesMudasFrutiferas: string[];
  especiesMudasIndustriais: string[];
}
