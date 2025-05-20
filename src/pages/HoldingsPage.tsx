
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ChevronRight, Clock, Check, Eye, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Holding {
  id: number;
  nome: string;
  tipo: string;
  status: 'ativa' | 'em_andamento' | 'pendente' | 'em_analise';
  etapa?: 'documentacao' | 'revisao' | 'aprovacao' | 'concluido';
  socios: number;
  ativos: number;
  valorTotal: number;
}

const HoldingsPage = () => {
  const [holdings] = useState<Holding[]>([
    {
      id: 1,
      nome: "Família Silva Holdings",
      tipo: "Limitada",
      status: 'ativa',
      socios: 4,
      ativos: 12,
      valorTotal: 7500000,
    },
    {
      id: 2,
      nome: "JSP Participações",
      tipo: "S.A.",
      status: 'em_andamento',
      etapa: 'revisao',
      socios: 3,
      ativos: 5,
      valorTotal: 3200000,
    },
    {
      id: 3,
      nome: "Costa Investimentos",
      tipo: "Limitada",
      status: 'em_analise',
      socios: 2,
      ativos: 3,
      valorTotal: 1800000,
    },
    {
      id: 4,
      nome: "Oliveira Family Office",
      tipo: "S.A.",
      status: 'em_andamento',
      etapa: 'documentacao',
      socios: 5,
      ativos: 8,
      valorTotal: 4500000,
    },
  ]);

  const getStatusBadge = (status: Holding['status'], etapa?: Holding['etapa']) => {
    switch (status) {
      case 'ativa':
        return <Badge variant="teal" className="flex items-center gap-1">
          <Check className="h-3 w-3" />
          <span>Ativa</span>
        </Badge>;
      case 'em_andamento':
        return (
          <div className="flex flex-col gap-1">
            <Badge className="bg-amber-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Em Andamento</span>
            </Badge>
            {etapa && <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="flex-1">
                {getEtapaText(etapa)}
              </span>
            </div>}
          </div>
        );
      case 'em_analise':
        return <Badge className="bg-blue-500 flex items-center gap-1">
          <Search className="h-3 w-3" />
          <span>Em Análise</span>
        </Badge>;
      case 'pendente':
        return <Badge className="bg-gray-400">Pendente</Badge>;
      default:
        return null;
    }
  };

  const getEtapaText = (etapa: Holding['etapa']) => {
    switch (etapa) {
      case 'documentacao':
        return 'Etapa: Documentação';
      case 'revisao':
        return 'Etapa: Revisão';
      case 'aprovacao':
        return 'Etapa: Aprovação';
      case 'concluido':
        return 'Etapa: Concluído';
      default:
        return '';
    }
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(valor);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-w1-teal">Holdings</h1>
        <Link to="/holdings/criar">
          <Button size="sm" className="bg-w1-mint text-w1-teal hover:bg-w1-mint/80">
            <PlusCircle className="mr-1 h-4 w-4" />
            Nova Holding
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {holdings.length > 0 ? (
          holdings.map((holding) => (
            <Card className="hover:shadow-md transition-shadow" key={holding.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{holding.nome}</h3>
                    <p className="text-sm text-muted-foreground">{holding.tipo}</p>
                  </div>
                  <Link to={`/holdings/${holding.id}`}>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-w1-teal">
                      <Eye className="h-4 w-4" />
                      <span>Ver</span>
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  {getStatusBadge(holding.status, holding.etapa)}
                  <p className="font-semibold text-w1-teal">
                    {formatarValor(holding.valorTotal)}
                  </p>
                </div>
                
                {holding.status === 'em_andamento' && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-w1-teal rounded-full" 
                        style={{ 
                          width: holding.etapa === 'documentacao' ? '25%' : 
                                 holding.etapa === 'revisao' ? '50%' : 
                                 holding.etapa === 'aprovacao' ? '75%' : 
                                 holding.etapa === 'concluido' ? '100%' : '0%' 
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Documentação</span>
                      <span>Revisão</span>
                      <span>Aprovação</span>
                      <span>Concluído</span>
                    </div>
                  </div>
                )}
                
                <div className="flex mt-2 gap-4 text-xs text-muted-foreground">
                  <span>{holding.socios} sócios</span>
                  <span>{holding.ativos} ativos</span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Você ainda não possui holdings cadastradas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoldingsPage;
