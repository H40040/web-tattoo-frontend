import Link from 'next/link'
import Image from 'next/image'

type Plano = {
  id: string
  nome: string
  descricao: string
  preco: number
  recursos: string[]
  limiteProjetos?: number | null
  limiteDepoimentos?: number | null
}

async function getPlanos(): Promise<Plano[]> {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334'
  try {
    const res = await fetch(`${base}/api/planos`, { next: { revalidate: 300 } })
    if (!res.ok) return []
    const data = await res.json()
    return (data.planos ?? []) as Plano[]
  } catch {
    return []
  }
}

export default async function Home() {
  const planos = await getPlanos()

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-saas-primary/20 rounded-full blur-[120px] -z-10 opacity-50" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] -z-10 opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-saas-dark-card border border-saas-dark-border rounded-full px-4 py-1.5 mb-8 shadow-sm animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-saas-primary"></span>
            <span className="text-sm font-medium text-saas-text-secondary">Novidade: Gestão financeira integrada</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-tight max-w-4xl mx-auto">
            Transforme sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-saas-primary-light to-saas-primary">Arte</span> em um <br />
            Negócio Profissional
          </h1>
          
          <p className="text-xl text-saas-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            Tenha seu site profissional, receba agendamentos e gerencie orçamentos em uma única plataforma. Feito para tatuadores e estúdios.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#pricing" className="w-full sm:w-auto bg-saas-primary hover:bg-saas-primary-hover text-white text-lg font-semibold px-8 py-4 rounded-xl transition-all shadow-xl shadow-saas-primary/25 hover:shadow-saas-primary/40 transform hover:-translate-y-1">
              Começar Agora
            </Link>
            <Link href="/demo" className="w-full sm:w-auto bg-saas-dark-card hover:bg-saas-dark-border border border-saas-dark-border text-white text-lg font-medium px-8 py-4 rounded-xl transition-all">
              Ver Demonstração
            </Link>
          </div>

          <div className="mt-16 relative mx-auto max-w-5xl">
            <div className="rounded-xl bg-saas-dark-border/30 p-2 backdrop-blur-sm border border-saas-dark-border/50 shadow-2xl">
               <div className="rounded-lg bg-saas-dark-bg overflow-hidden aspect-video relative">
                 <div className="absolute inset-0 flex items-center justify-center text-saas-text-muted">
                    [Placeholder: Dashboard Preview Image]
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-saas-dark-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tudo que você precisa</h2>
            <p className="text-saas-text-secondary text-lg max-w-2xl mx-auto">
              Substitua planilhas, DMs do Instagram e ferramentas desconexas por uma solução unificada.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🎨"
              title="Site Profissional"
              description="Templates exclusivos para tatuagem. Mostre seu portfólio com a qualidade que ele merece."
            />
            <FeatureCard 
              icon="📅"
              title="Agendamento Inteligente"
              description="Permita que clientes vejam sua disponibilidade e solicitem horários sem trocar 50 mensagens."
            />
            <FeatureCard 
              icon="💰"
              title="Orçamentos & Financeiro"
              description="Formulários de orçamento detalhados e controle financeiro para saber exatamente quanto você ganha."
            />
             <FeatureCard 
              icon="📱"
              title="Link na Bio"
              description="Uma página otimizada para mobile que centraliza todos os seus links importantes."
            />
            <FeatureCard 
              icon="🔒"
              title="Área do Cliente"
              description="Histórico de sessões, cuidados pós-tattoo e termos de consentimento digital."
            />
            <FeatureCard 
              icon="🚀"
              title="SEO Otimizado"
              description="Seu estúdio aparecendo no Google quando procurarem por tatuagem na sua cidade."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-saas-dark-card border-y border-saas-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Planos Simples e Transparentes</h2>
            <p className="text-saas-text-secondary text-lg">Comece grátis e cresça conforme sua agenda lota.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {planos.length > 0 ? (
              planos.map((plano) => (
                <PricingCard key={plano.id} plano={plano} />
              ))
            ) : (
              // Fallback mock plans if API is down/empty
              <>
                 <PricingCard plano={{
                   id: 'basic', 
                   nome: 'Iniciante', 
                   preco: 0, 
                   descricao: 'Para quem está começando', 
                   recursos: ['Site Básico', 'Até 10 Projetos', 'Link na Bio']
                 }} />
                 <PricingCard plano={{
                   id: 'pro', 
                   nome: 'Profissional', 
                   preco: 49.90, 
                   descricao: 'Para tatuadores com agenda ativa', 
                   recursos: ['Site Completo', 'Projetos Ilimitados', 'Orçamentos', 'Agenda'],
                   destaque: true
                 }} />
                 <PricingCard plano={{
                   id: 'studio', 
                   nome: 'Estúdio', 
                   preco: 129.90, 
                   descricao: 'Para estúdios com múltiplos artistas', 
                   recursos: ['Multi-artistas', 'Gestão Financeira', 'Domínio Grátis', 'Suporte Prioritário']
                 }} />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-saas-primary/10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Pronto para profissionalizar seu estúdio?</h2>
          <p className="text-xl text-saas-text-secondary mb-10">
            Junte-se a centenas de artistas que já usam o InkManage para focar no que importa: a arte.
          </p>
          <Link href="/#pricing" className="inline-block bg-white text-saas-primary hover:bg-gray-100 font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition-colors">
            Criar Minha Conta Grátis
          </Link>
        </div>
      </section>
    </>
  )
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="bg-saas-dark-card border border-saas-dark-border p-8 rounded-2xl hover:border-saas-primary/50 transition-colors group">
      <div className="w-12 h-12 bg-saas-dark-bg rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-saas-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  )
}

function PricingCard({ plano }: { plano: any }) {
  const isPopular = plano.destaque || plano.nome === 'Profissional'; // Mock logic for highlight
  
  return (
    <div className={`relative flex flex-col p-8 rounded-2xl border ${isPopular ? 'bg-saas-dark-card border-saas-primary shadow-2xl shadow-saas-primary/10' : 'bg-saas-dark-bg border-saas-dark-border'} transition-transform hover:-translate-y-1`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-saas-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Mais Popular
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white">{plano.nome}</h3>
        <p className="text-saas-text-muted text-sm mt-2">{plano.descricao}</p>
      </div>
      
      <div className="mb-8">
        <span className="text-4xl font-bold text-white">R$ {plano.preco}</span>
        <span className="text-saas-text-secondary">/mês</span>
      </div>
      
      <ul className="space-y-4 mb-8 flex-1">
        {plano.recursos.map((recurso: string, idx: number) => (
          <li key={idx} className="flex items-start text-sm text-saas-text-secondary">
            <svg className="w-5 h-5 text-saas-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {recurso}
          </li>
        ))}
      </ul>
      
      <Link href={`http://localhost:3001/register?plan=${plano.id}`} className={`block w-full py-3 px-6 rounded-lg text-center font-semibold transition-colors ${isPopular ? 'bg-saas-primary hover:bg-saas-primary-hover text-white' : 'bg-saas-dark-border hover:bg-saas-dark-border/80 text-white'}`}>
        Escolher {plano.nome}
      </Link>
    </div>
  )
}
