<template>
  <div>
    <header>
      <nav>Welcome to Hacker News</nav>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <p>&copy; 2025</p>
    </footer>
  </div>
</template>
<style lang="scss" scoped>
header {
  background-color: #1babd6;
  color: white;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.25rem;
}
main {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #f3f4f6;
  color: #374151;
  font-size: 0.875rem;
  margin-top: auto;
}
</style>
