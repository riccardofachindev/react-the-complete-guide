import { useState } from 'react';
import Header from './components/Header/Header.jsx'
import CoreConcept from './components/CoreConcept.jsx'
import TabButton from './components/TabButton.jsx';
import { CORE_CONCEPTS, EXAMPLES } from './data-with-examples.js';

function App() {
  const [currentTopic, setCurrentTopic] = useState()

  const selectHandler = (selectedButton) => {
    setCurrentTopic(selectedButton);
  }

  let tabContent = 'Please select a topic.';

  if (currentTopic) {
    tabContent = <div id="tab-content">
      <h3>{EXAMPLES[currentTopic].title}</h3>
      <p>{EXAMPLES[currentTopic].description}</p>
      <pre><code>{EXAMPLES[currentTopic].code}</code></pre>
    </div>
  }

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core concepts</h2>
          <ul>
            {CORE_CONCEPTS.map(concept => <CoreConcept key={concept.title} {...concept} />)}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              isSelected={currentTopic === 'components'}
              onSelect={() => selectHandler('components')
              }>Components</TabButton>
            <TabButton
              isSelected={currentTopic === 'jsx'}
              onSelect={() => selectHandler('jsx')}>JSX</TabButton>
            <TabButton
              isSelected={currentTopic === 'props'}
              onSelect={() => selectHandler('props')}>Props</TabButton>
            <TabButton
              isSelected={currentTopic === 'state'}
              onSelect={() => selectHandler('state')}>State</TabButton>
          </menu>
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
