
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  CalendarDays,
  FileText,
  Clock,
  Upload,
  MessageCircle,
  BarChart3,
  Briefcase,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const ClientePerfilPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock client data based on id
  const client = {
    id: Number(id),
    name: id === "1" ? "João Silva" : id === "2" ? "Maria Oliveira" : "Carlos Santos",
    email: id === "1" ? "joao.silva@exemplo.com" : id === "2" ? "maria.oliveira@exemplo.com" : "carlos.santos@exemplo.com",
    phone: id === "1" ? "(11) 98765-4321" : id === "2" ? "(21) 98765-4321" : "(31) 98765-4321",
    lastActive: id === "1" ? "2023-05-16" : id === "2" ? "2023-05-15" : "2023-05-10",
    documents: id === "1" ? 8 : id === "2" ? 12 : 5,
    pendingDocuments: id === "1" ? 2 : id === "2" ? 0 : 3,
    address: id === "1" ? "Rua Exemplo, 123 - São Paulo/SP" : id === "2" ? "Av. Principal, 456 - Rio de Janeiro/RJ" : "Rua Central, 789 - Belo Horizonte/MG",
    cpf: id === "1" ? "123.456.789-00" : id === "2" ? "987.654.321-00" : "456.789.123-00",
    birthdate: id === "1" ? "15/05/1980" : id === "2" ? "22/07/1975" : "10/12/1985",
    clientSince: id === "1" ? "Janeiro/2022" : id === "2" ? "Março/2021" : "Setembro/2022",
    annualIncome: id === "1" ? "R$ 350.000,00" : id === "2" ? "R$ 500.000,00" : "R$ 280.000,00",
    patrimonyValue: id === "1" ? "R$ 2.750.000,00" : id === "2" ? "R$ 4.200.000,00" : "R$ 1.900.000,00",
    hasHoldings: id === "1" ? true : id === "2" ? true : false,
    holdingsCount: id === "1" ? 2 : id === "2" ? 1 : 0,
    documentsList: [
      {
        id: 1,
        name: "RG / CNH",
        status: id === "2" ? "aprovado" : id === "1" ? "pendente" : "solicitado",
        date: id === "2" ? "12/03/2023" : id === "1" ? "05/04/2023" : null
      },
      {
        id: 2,
        name: "Comprovante de Residência",
        status: id === "2" ? "aprovado" : id === "3" ? "pendente" : "aprovado",
        date: id === "2" ? "10/03/2023" : id === "3" ? "01/05/2023" : "10/04/2023"
      },
      {
        id: 3,
        name: "Declaração IR",
        status: id === "2" ? "aprovado" : "pendente",
        date: id === "2" ? "15/03/2023" : null
      },
      {
        id: 4,
        name: "Certidão de Nascimento",
        status: id === "3" ? "pendente" : "aprovado",
        date: id === "3" ? "02/05/2023" : "13/04/2023"
      },
      {
        id: 5,
        name: "Contrato Social",
        status: id === "1" ? "aprovado" : id === "2" ? "aprovado" : "solicitado", 
        date: id === "1" ? "20/03/2023" : id === "2" ? "05/03/2023" : null
      }
    ],
  };

  // Format date to Brazilian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  const handleRequestDocument = (documentName: string) => {
    toast({
      title: "Documento solicitado",
      description: `Uma solicitação para "${documentName}" foi enviada para ${client.name}`,
    });
  };
  
  const handleStartChat = () => {
    toast({
      title: "Chat iniciado",
      description: `Iniciando conversa com ${client.name}`,
    });
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/clientes")}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-w1-teal">Perfil do Cliente</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">{client.name}</span>
            {client.pendingDocuments > 0 ? (
              <Badge className="bg-amber-100 text-amber-800">Pendente</Badge>
            ) : (
              <Badge className="bg-green-100 text-green-800">Em dia</Badge>
            )}
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleStartChat}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Mensagem</span>
          </Button>
          <Button 
            size="sm" 
            className="bg-w1-teal hover:bg-w1-teal/90 flex items-center gap-1"
            onClick={() => handleRequestDocument("Novo documento")}
          >
            <Upload className="h-4 w-4" />
            <span>Solicitar Doc</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center text-muted-foreground mb-1">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm">Nome</span>
                </div>
                <p className="font-medium">{client.name}</p>
              </div>
              
              <div>
                <div className="flex items-center text-muted-foreground mb-1">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">Email</span>
                </div>
                <p>{client.email}</p>
              </div>
              
              <div>
                <div className="flex items-center text-muted-foreground mb-1">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">Telefone</span>
                </div>
                <p>{client.phone}</p>
              </div>
              
              <div>
                <div className="flex items-center text-muted-foreground mb-1">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">CPF</span>
                </div>
                <p>{client.cpf}</p>
              </div>
              
              <div>
                <div className="flex items-center text-muted-foreground mb-1">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  <span className="text-sm">Data de nascimento</span>
                </div>
                <p>{client.birthdate}</p>
              </div>
              
              <div>
                <div className="flex items-center text-muted-foreground mb-1">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">Cliente desde</span>
                </div>
                <p>{client.clientSince}</p>
              </div>
              
              <div>
                <div className="flex items-center text-muted-foreground mb-1">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">Última atividade</span>
                </div>
                <p>{formatDate(client.lastActive)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="documentos" className="w-full">
            <TabsList className="grid grid-cols-4 h-auto">
              <TabsTrigger value="documentos" className="flex flex-col items-center py-2">
                <FileText className="h-4 w-4 mb-1" />
                <span className="text-xs">Documentos</span>
              </TabsTrigger>
              <TabsTrigger value="patrimonio" className="flex flex-col items-center py-2">
                <BarChart3 className="h-4 w-4 mb-1" />
                <span className="text-xs">Patrimônio</span>
              </TabsTrigger>
              <TabsTrigger value="holdings" className="flex flex-col items-center py-2">
                <Briefcase className="h-4 w-4 mb-1" />
                <span className="text-xs">Holdings</span>
              </TabsTrigger>
              <TabsTrigger value="configuracoes" className="flex flex-col items-center py-2">
                <Settings className="h-4 w-4 mb-1" />
                <span className="text-xs">Config.</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="documentos" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>Documentos do Cliente</span>
                    <Button 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleRequestDocument("Novo documento")}
                    >
                      Solicitar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y">
                    {client.documentsList.map((doc) => (
                      <li key={doc.id} className="py-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            {doc.date && (
                              <p className="text-xs text-muted-foreground">Atualizado em: {doc.date}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {doc.status === "aprovado" ? (
                              <Badge className="bg-green-100 text-green-800">Aprovado</Badge>
                            ) : doc.status === "pendente" ? (
                              <Badge className="bg-amber-100 text-amber-800">Pendente</Badge>
                            ) : (
                              <Badge className="bg-blue-100 text-blue-800">Solicitado</Badge>
                            )}
                            
                            <Button variant="ghost" size="sm" className="text-w1-teal">
                              {doc.status === "aprovado" ? "Ver" : "Solicitar"}
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="patrimonio" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Patrimônio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Patrimônio Declarado</span>
                    <span className="font-bold text-w1-teal">{client.patrimonyValue}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Renda Anual</span>
                    <span className="font-bold text-w1-teal">{client.annualIncome}</span>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      className="w-full bg-w1-teal hover:bg-w1-teal/90"
                      onClick={() => navigate("/cliente/" + client.id + "/patrimonio")}
                    >
                      Ver detalhamento completo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="holdings" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Holdings do Cliente</CardTitle>
                </CardHeader>
                <CardContent>
                  {client.hasHoldings ? (
                    <div className="space-y-4">
                      <p>O cliente possui {client.holdingsCount} holding(s) registrada(s).</p>
                      
                      <Button 
                        className="w-full bg-w1-teal hover:bg-w1-teal/90"
                        onClick={() => navigate("/cliente/" + client.id + "/holdings")}
                      >
                        Visualizar holdings
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">Este cliente não possui holdings cadastradas.</p>
                      
                      <Button 
                        className="bg-w1-teal hover:bg-w1-teal/90"
                        onClick={() => navigate("/holdings/criar")}
                      >
                        Criar nova holding
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="configuracoes" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Configurações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">Editar dados do cliente</Button>
                  <Button className="w-full" variant="outline">Gerenciar permissões</Button>
                  <Button className="w-full" variant="outline">Configurar notificações</Button>
                  <Button className="w-full text-red-500 hover:bg-red-50" variant="outline">
                    Arquivar cliente
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientePerfilPage;
