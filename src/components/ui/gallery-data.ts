// Tipos e catálogo compartilhados entre PhotoGallery (prévia) e FullGallery (modal)

export type MediaKind = 'image' | 'video'
export type Category  = 'fotografia' | 'social-media' | 'video' | 'projetos'

export interface GalleryMedia {
  id:        string
  src:       string
  type:      MediaKind
  category:  Category
  label:     string
  subtitle?: string   // métrica-chave ou cliente — exibida nos cards de projetos
  poster?:   string   // imagem de capa para vídeos (evita frame preto com preload="none")
}

// ── Catálogo completo — varrido estático + cases de marketing ─────────────────

export const ALL_MEDIA: GalleryMedia[] = [

  // Fotografia — paisagem e lifestyle
  { id: 'g01', type: 'image', category: 'fotografia',   src: '/images/imagensReais/praianas/IMG_3506.JPG.jpeg',            label: 'Praia'        },
  { id: 'g02', type: 'image', category: 'fotografia',   src: '/images/imagensReais/praianas/IMG_3578.JPG.jpeg',            label: 'Praia'        },

  // Fotografia — casamentos
  { id: 'g03', type: 'image', category: 'fotografia',   src: '/images/imagensReais/CasamentoBrava/CasamentoBrava.jpeg',    label: 'Casamento'    },
  { id: 'g04', type: 'image', category: 'fotografia',   src: '/images/imagensReais/casamento/bencaoCasamento.PNG',         label: 'Cerimônia'    },
  { id: 'g05', type: 'image', category: 'fotografia',   src: '/images/imagensReais/casamento/casamento.PNG',               label: 'Casamento'    },
  { id: 'g06', type: 'image', category: 'fotografia',   src: '/images/imagensReais/casamentoPrimos/Casamento primos preto e branco.PNG', label: 'Casamento' },
  { id: 'g07', type: 'image', category: 'fotografia',   src: '/images/imagensReais/casamentoPrimos/IMG_7623.JPG.jpeg',    label: 'Casamento'    },

  // Fotografia — eventos
  { id: 'g08', type: 'image', category: 'fotografia',   src: '/images/imagensReais/BatizadoDiana/capaBatizadoDiana.jpeg',  label: 'Batizado'     },
  { id: 'g09', type: 'image', category: 'fotografia',   src: '/images/imagensReais/FirstLook15anosPai/IMG_5504.JPG.jpeg', label: '15 Anos'      },

  // Social Media — conteúdo para redes sociais
  { id: 'g10', type: 'image', category: 'social-media', src: '/images/imagensReais/FotoProfissional.jpeg',                 label: 'Profissional' },
  { id: 'g11', type: 'image', category: 'social-media', src: '/images/imagensReais/fotoAleatoria.PNG',                     label: 'Ensaio'       },

  // Vídeos — poster usa a foto do mesmo evento para evitar frame preto com preload="none"
  { id: 'g12', type: 'video', category: 'video', src: '/images/imagensReais/CasamentoBrava/casamentoBravaVideo.MOV',                                                   label: 'Casamento',   poster: '/images/imagensReais/CasamentoBrava/CasamentoBrava.jpeg'          },
  { id: 'g13', type: 'video', category: 'video', src: '/images/imagensReais/BatizadoDiana/batismoBB.MOV',                                                              label: 'Batizado',    poster: '/images/imagensReais/BatizadoDiana/capaBatizadoDiana.jpeg'        },
  { id: 'g14', type: 'video', category: 'video', src: '/images/imagensReais/FirstLook15anosPai/IMG_7498.MOV',                                                          label: '15 Anos',     poster: '/images/imagensReais/FirstLook15anosPai/IMG_5504.JPG.jpeg'        },
  { id: 'g15', type: 'video', category: 'video', src: '/images/imagensReais/casamentoPrimos/Pré wedding gravado na praia Brava - Gabriel e Maria Eduarda.MOV',         label: 'Pré-Wedding', poster: '/images/imagensReais/casamentoPrimos/IMG_7623.JPG.jpeg'           },

  // Projetos — cases de estratégia e marketing digital (anteriormente em SelectedWork)
  { id: 'p01', type: 'image', category: 'projetos', src: '/images/testimonials/imagem dos conjuntos do brasil.jpg', label: 'Conjuntos do Brasil', subtitle: '22k seguidores · R$ 85k/mês orgânico'    },
  { id: 'p02', type: 'image', category: 'projetos', src: '/images/testimonials/imagem camera.jpg',                  label: 'Marca Pessoal',       subtitle: '52k seguidores · R$ 18k em publis/ano'     },
  { id: 'p03', type: 'image', category: 'projetos', src: '/images/testimonials/imagem batiman.jpg',                 label: 'Arte Urbana SP',      subtitle: '28k seguidores · R$ 95k captados via IG'   },
  { id: 'p04', type: 'image', category: 'projetos', src: '/images/testimonials/prancha.jpg',                        label: 'Namook',              subtitle: '3.2× crescimento · R$ 42k em eventos'      },
  { id: 'p05', type: 'image', category: 'projetos', src: '/images/testimonials/formatura.jpg',                      label: 'Formalize Eventos',   subtitle: 'R$ 210k em contratos · 8.7% conversão'     },
  { id: 'p06', type: 'image', category: 'projetos', src: '/images/testimonials/rio de janeiro.jpg',                 label: 'Rio Autêntico',       subtitle: '34k seguidores · +210% em reservas'        },
]

// 5 itens curados para a prévia scatter — inclui 1 projeto para variedade
export const PREVIEW_MEDIA: GalleryMedia[] = (() => {
  const ids = ['g01', 'g03', 'g08', 'p01', 'g12']
  const map  = new Map(ALL_MEDIA.map(m => [m.id, m]))
  return ids.map(id => map.get(id)).filter((m): m is GalleryMedia => m != null)
})()
