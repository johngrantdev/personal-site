document.querySelectorAll<HTMLElement>('[data-card]').forEach((card) => {
  card.style.setProperty('--card-gradient', card.dataset.cardGradient || '')
  card.style.animationDelay = card.dataset.animationDelay || ''
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    card.style.setProperty('--mouse-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  })
})

document.querySelectorAll<HTMLElement>('[data-transition-delay]').forEach((element) => {
  element.style.transitionDelay = element.dataset.transitionDelay || ''
})

document.querySelectorAll<HTMLElement>('[data-indent]').forEach((element) => {
  element.style.marginLeft = element.dataset.indent || ''
})

document.querySelectorAll('[data-theme-toggle]').forEach((button) =>
  button.addEventListener('click', () => {
    const dark = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }),
)

const menuButton = document.querySelector('[data-menu-toggle]')
const menu = document.querySelector('#main-menu')
const page = document.querySelector('[data-page-container]')
const overlay = document.querySelector('[data-menu-overlay]')
const transforms = [
  'rotate-y-[25deg]',
  'translate-y-36',
  '-translate-x-64',
  'sm:rotate-y-[15deg]',
  'sm:translate-y-44',
  'sm:-translate-x-64',
  'xl:rotate-y-0',
  'xl:translate-y-0',
  'xl:translate-x-0',
]

const setMenuOpen = (open: boolean) => {
  menu?.classList.toggle('opacity-0', !open)
  menu?.classList.toggle('-right-full', !open)
  menu?.classList.toggle('opacity-100', open)
  menu?.classList.toggle('right-0', open)
  transforms.forEach((className) => page?.classList.toggle(className, open))
  overlay?.classList.toggle('hidden', !open)
  menuButton?.setAttribute('aria-expanded', String(open))
}

menuButton?.addEventListener('click', () =>
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'),
)
overlay?.addEventListener('click', () => setMenuOpen(false))
document.querySelectorAll('[data-menu-close]').forEach((link) =>
  link.addEventListener('click', () => setMenuOpen(false)),
)
