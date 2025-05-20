
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Eye, Upload, Clock, Check, AlertTriangle, FileText } from "lucide-react";

type DocumentType = 
  | { id: number; name: string; status: string; requestedBy: string; requestDate: string; message: string; }
  | { id: number; name: string; status: string; submittedDate: string; approvedDate: string | null; };

const DocumentosPage = () => {
  // Mock data
  const [documents, setDocuments] = useState<DocumentType[]>([
    {
      id: 1,
      name: "Contrato Social",
      status: "aprovado",
      submittedDate: "2023-03-15",
      approvedDate: "2023-03-20"
    },
    {
      id: 2,
      name: "Certidão Negativa de Débitos",
      status: "aprovado",
      submittedDate: "2023-04-10",
      approvedDate: "2023-04-15"
    },
    {
      id: 3,
      name: "Escritura do Imóvel",
      status: "pendente",
      submittedDate: "2023-05-05",
      approvedDate: null
    },
    {
      id: 4,
      name: "Declaração de Imposto de Renda",
      status: "solicitado",
      requestedBy: "Consultor W1",
      requestDate: "2023-05-10",
      message: "Precisamos da sua declaração de IR mais recente para prosseguir com a análise."
    },
    {
      id: 5,
      name: "Certidão de Nascimento dos Dependentes",
      status: "solicitado",
      requestedBy: "Consultor W1",
      requestDate: "2023-05-12",
      message: "Por favor, envie as certidões de nascimento dos seus dependentes para completar a análise patrimonial."
    }
  ]);
  
  const [activeTab, setActiveTab] = useState("todos");
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showReuploadModal, setShowReuploadModal] = useState(false);
  
  // Filter documents based on active tab
  const filteredDocuments = documents.filter(doc => {
    if (activeTab === "todos") return true;
    return doc.status === activeTab;
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <Check className="h-3 w-3" />
            <span>Aprovado</span>
          </Badge>
        );
      case "pendente":
        return (
          <Badge className="bg-amber-100 text-amber-800 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Em Análise</span>
          </Badge>
        );
      case "rejeitado":
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <span>Rejeitado</span>
          </Badge>
        );
      case "solicitado":
        return (
          <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
            <FileText className="h-3 w-3" />
            <span>Solicitado</span>
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const handleViewDocument = (document: DocumentType) => {
    setSelectedDocument(document);
    setShowDocumentModal(true);
  };
  
  const handleReuploadDocument = (document: DocumentType) => {
    setSelectedDocument(document);
    setShowReuploadModal(true);
  };
  
  const handleFileUpload = () => {
    if (!selectedDocument) return;
    
    toast({
      title: "Documento reenviado",
      description: "Seu documento foi reenviado com sucesso e está em análise.",
    });
    
    // Update document status in mock data
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === selectedDocument.id 
          ? { 
              ...doc, 
              status: "pendente",
              submittedDate: new Date().toISOString().split('T')[0],
              approvedDate: null
            } 
          : doc
      )
    );
    
    setShowReuploadModal(false);
  };
  
  const handleUploadRequested = () => {
    toast({
      title: "Documento enviado",
      description: "Seu documento foi enviado com sucesso e está em análise.",
    });
    
    // Update document status in mock data
    if (selectedDocument) {
      setDocuments(docs => 
        docs.map(doc => 
          doc.id === selectedDocument.id 
            ? { 
                id: doc.id,
                name: doc.name,
                status: "pendente",
                submittedDate: new Date().toISOString().split('T')[0],
                approvedDate: null
              } 
            : doc
        )
      );
    }
    
    setShowDocumentModal(false);
  };

  const getDocumentDate = (document: DocumentType) => {
    if ('submittedDate' in document) {
      return formatDate(document.submittedDate);
    } else if ('requestDate' in document) {
      return formatDate(document.requestDate);
    }
    return "";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-w1-teal">Documentos</h1>
        <p className="text-muted-foreground">Gerencie seus documentos e responda às solicitações</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="aprovado">Aprovados</TabsTrigger>
          <TabsTrigger value="pendente">Em Análise</TabsTrigger>
          <TabsTrigger value="solicitado">Solicitados</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Seus Documentos</span>
                <Button 
                  className="bg-w1-teal hover:bg-w1-teal/90"
                  onClick={() => navigate("/document-scanner")}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Enviar Documento
                </Button>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {filteredDocuments.length > 0 ? (
                <div className="divide-y">
                  {filteredDocuments.map((document) => (
                    <div key={document.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{document.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {getDocumentDate(document)}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getStatusBadge(document.status)}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-w1-teal"
                            onClick={() => handleViewDocument(document)}
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            Ver
                          </Button>
                          
                          {document.status === "pendente" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReuploadDocument(document)}
                            >
                              <Upload className="mr-1 h-4 w-4" />
                              Reenviar
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {document.status === "solicitado" && 'message' in document && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-md text-sm">
                          <p className="font-medium">Solicitado por: {document.requestedBy}</p>
                          <p className="mt-1">{document.message}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Não há documentos disponíveis nesta categoria.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Document View Modal */}
      <Dialog open={showDocumentModal} onOpenChange={setShowDocumentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="p-4 border rounded-md bg-gray-50 flex items-center justify-center min-h-[200px]">
            {selectedDocument?.status === "solicitado" ? (
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-blue-500 mb-2" />
                <p className="text-muted-foreground">Este documento foi solicitado e aguarda envio.</p>
              </div>
            ) : (
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-500 mb-2" />
                <p className="text-muted-foreground">Visualização do documento</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Status: {selectedDocument?.status === "aprovado" ? "Aprovado" : 
                        selectedDocument?.status === "pendente" ? "Em Análise" : 
                        "Solicitado"}
              </p>
            </div>
            
            {selectedDocument?.status === "solicitado" && (
              <Button onClick={handleUploadRequested}>Enviar Documento</Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Reupload Modal */}
      <Dialog open={showReuploadModal} onOpenChange={setShowReuploadModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reenviar {selectedDocument?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="file">Arquivo</Label>
              <Input id="file" type="file" />
            </div>
            
            <div>
              <Label htmlFor="notes">Observações (opcional)</Label>
              <Textarea id="notes" placeholder="Adicione informações relevantes sobre este documento..." />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReuploadModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleFileUpload}>
              Reenviar Documento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const navigate = (path: string) => {
  window.location.href = path;
};

export default DocumentosPage;
