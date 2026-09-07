/* Stop Big Roo: all interactions run locally. No trackers or form submissions. */
(function () {
  'use strict';
  const QUESTIONS = [
    { title: 'Do you currently reside in Australia?', options: [['Yes. Should I be concerned?', 40], ['No, but I have plans.', 10], ['No, and this is not helping.', 4]] },
    { title: 'Have you ever called a kangaroo “adorable”?', options: [['Yes. Possibly today.', 25], ['Once, before I knew better.', 12], ['Never. I have questions.', 0]] },
    { title: 'Could you win a fight with a kangaroo?', options: [['Honestly? I like my chances.', 30], ['Depends. Does it know I’m coming?', 15], ['I would prefer to remain uninvolved.', 2]] },
    { title: 'A kangaroo is on an airline logo. Your reaction?', options: [['Great branding. I’m booking.', 20], ['I hadn’t thought about it.', 10], ['The influence goes all the way up.', 0]] }
  ];
  function assessRisk(answers) {
    if (answers.length !== QUESTIONS.length || answers.some((v, i) => !QUESTIONS[i].options.some(o => o[1] === v))) return null;
    const score = Math.max(6, Math.min(99, Math.round(answers.reduce((sum, v) => sum + v, 0) / 115 * 100)));
    if (score >= 70) return { score, title: 'CRITICAL COMPLACENCY.', note: 'You’re one souvenir-shop purchase away from becoming an ambassador. Step away from the plush kangaroo and reconsider the entire relationship.' };
    if (score >= 45) return { score, title: 'DEEPLY SUSCEPTIBLE.', note: 'You still think it would probably be fine. That is exactly the kind of confidence Big Roo’s marketing department is counting on.' };
    if (score >= 25) return { score, title: 'CAUTIOUSLY CONCERNED.', note: 'You have questions. Good. Now ask why an animal needs this many brand partnerships and its own built-in kickstand.' };
    return { score, title: 'ADMIRABLY SUSPICIOUS.', note: 'You maintain a healthy distance from the marketing. Stay curious. The next time someone says “but look at its little face,” remember the rest of it.' };
  }
  function encounter(weight) {
    if (weight < 123) return ['A brief aviation career.', 'At ' + weight + ' lb, this imaginary matchup is less a contest and more an unscheduled departure. Your carry-on is your confidence.'];
    if (weight < 189) return ['A confidence problem.', 'You have a strong opinion. The kangaroo has a tail. Only one of those is load-bearing. At ' + weight + ' lb, we recommend a different hobby.'];
    if (weight < 268) return ['A compelling theory. A bad afternoon.', 'At ' + weight + ' lb, the weight comparison looks promising. Unfortunately, “looks promising” is also how most terrible ideas begin.'];
    return ['Still absolutely not.', 'At ' + weight + ' lb, you have won the weigh-in. Congratulations. The kangaroo would like to skip directly to the part it has been practicing.'];
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { assessRisk, encounter, QUESTIONS };
  if (typeof document === 'undefined') return;
  const $ = id => document.getElementById(id);
  const menu = document.querySelector('.menu-toggle');
  const navigation = $('navigation');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); });
  navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
  let pendingScroll = false;
  function updateProgress() { const max = document.documentElement.scrollHeight - innerHeight; $('readingProgress').style.width = (max > 0 ? Math.min(100, Math.max(0, scrollY / max * 100)) : 0) + '%'; pendingScroll = false; }
  addEventListener('scroll', () => { if (!pendingScroll) { pendingScroll = true; requestAnimationFrame(updateProgress); } }, { passive: true });
  addEventListener('resize', updateProgress);
  updateProgress();

  const museum = 'https://australian.museum/learn/animals/mammals/red-kangaroo/';
  const CASES = [
    { title: 'THEY TRAIN FOR THIS.', fact: 'Red kangaroos engage in boxing-style encounters. Research describes pushing and wrestling to unbalance an opponent, and distinguishes play fighting from conflicts over resources.', comment: 'We have reviewed the footage. We have reviewed our own upper-body strength. We will be submitting our questions in writing.', source: 'Read the boxing behavior research ↗', url: 'https://escholarship.org/uc/item/0dv2h5zv' },
    { title: 'A FIFTH LIMB. ZERO EXPLANATION.', fact: 'During slow, five-limbed locomotion, a kangaroo’s tail actively provides propulsion and mechanical power. It does more than keep the animal balanced.', comment: 'You have two legs. It brought an extra. We are asking the sporting authorities why this was ever allowed.', source: 'Read the Biology Letters study ↗', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4126630/' },
    { title: 'THE POUCH IS A PIPELINE.', fact: 'Female red kangaroos can pause the development of an embryo while an older joey occupies the pouch. This reproductive adaptation is called embryonic diapause.', comment: 'The public sees a baby carrier. We see a succession plan with surprisingly sophisticated scheduling software.', source: 'Read the Australian Museum profile ↗', url: museum },
    { title: 'WHY DOES IT NEED ALL THAT?', fact: 'The Australian Museum reports that male red kangaroos can weigh up to 92 kg, with a head-and-body length up to 1.4 metres and a tail up to 1 metre. Those are upper measurements, not a description of every kangaroo.', comment: 'We are not body-shaming. We are asking why the herbivore looks like it charges a cover at the door.', source: 'Read the Australian Museum measurements ↗', url: museum },
    { title: 'THE BRANDING IS WORKING.', fact: 'The Australian Museum describes the red kangaroo as an iconic Australian animal. Our alleged “kangaroo lobby” is a campaign invention, not a documented organization.', comment: 'A beloved national image. Premium gift-shop placement. An audience that insists on calling it cute. If this isn’t a PR strategy, someone should at least be getting paid.', source: 'Read the Australian Museum profile ↗', url: museum },
    { title: 'A DIET IS NOT AN ALIBI.', fact: 'Red kangaroos are herbivores. Their diet includes grasses, forbs and shrub leaves. That is a feeding classification, not an assessment of personality.', comment: '“It eats salad” is an unusual defense for an animal that arrived with an entire boxing setup. We remain unconvinced.', source: 'Read the Australian Museum diet notes ↗', url: museum }
  ];
  const dialog = $('caseDialog');
  let caseTrigger;
  document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.case), file = CASES[index];
    caseTrigger = button;
    $('caseNumber').textContent = 'AMA / CASE FILE ' + String(index + 1).padStart(3, '0');
    $('caseTitle').textContent = file.title;
    $('caseFact').textContent = file.fact;
    $('caseComment').textContent = file.comment;
    $('caseSource').textContent = file.source;
    $('caseSource').href = file.url;
    $('caseFootnote').textContent = 'The source supports the biology. The suspicious interpretation is ours.';
    dialog.showModal(); document.body.classList.add('modal-open');
  }));
  $('closeDialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); caseTrigger?.focus({ preventScroll: true }); });

  const PARTS = {
    face: ['01 / PUBLIC RELATIONS', 'The face is the operation.', 'Soft eyes. Excellent ears. The face of an animal that knows exactly how good it looks on a tote bag. We consider this a conflict of interest.'],
    arms: ['02 / CONFLICT RESOLUTION', 'Those are not hugging arms.', 'The forelimbs participate in grappling during boxing encounters. In our official assessment, the handshake portion of this relationship is canceled.'],
    legs: ['03 / EXCESS CAPACITY', 'Two very strong arguments.', 'Powerful hind legs handle the hopping and feature in fighting behavior. We would like to know why “getting around” required this much engineering.'],
    tail: ['04 / STRUCTURAL ADVANTAGE', 'It brought its own kickstand.', 'The tail supplies propulsion in slow locomotion. A whole extra functional limb. You brought comfortable shoes. The procurement gap is embarrassing.'],
    pouch: ['05 / SUCCESSION PLANNING', 'The next generation is on board.', 'Female kangaroos carry developing joeys in a pouch. It looks maternal. Our campaign has chosen to call it a mobile onboarding department.'],
    claw: ['06 / THE FINE PRINT', 'Read the terms and conditions.', 'The feet come with claws. This is the part that rarely makes it onto the souvenir mug. We suggest evaluating the entire product before endorsing it.']
  };
  document.querySelectorAll('[data-part]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-part]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const part = PARTS[button.dataset.part]; $('partTag').textContent = 'COMPONENT ' + part[0]; $('partTitle').textContent = part[1]; $('partBody').textContent = part[2];
  }));
  const MYTHS = [['“They’re just gentle herbivores.”', '“We would like you to focus on the salad, not the upper-body strength.”'], ['“The pouch is adorable.”', '“Please ignore the fully integrated succession plan.”'], ['“It’s a beloved national symbol.”', '“The branding is working exactly as intended.”']];
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const finding = button.dataset.view === 'finding'; $('mythList').classList.toggle('findings', finding);
    $('mythList').querySelectorAll('p').forEach((p, i) => { p.textContent = MYTHS[i][finding ? 1 : 0]; });
  }));

  let step = 0, answers = [];
  function renderQuestion(focus) {
    $('quizQuestion').hidden = false; $('quizResult').hidden = true;
    $('quizStep').textContent = 'QUESTION ' + String(step + 1).padStart(2, '0') + ' / 04';
    $('quizProgress').style.width = ((step + 1) * 25) + '%';
    $('questionTitle').textContent = QUESTIONS[step].title;
    $('quizBack').disabled = step === 0;
    $('quizOptions').replaceChildren();
    QUESTIONS[step].options.forEach(([label, value], i) => {
      const button = document.createElement('button'), letter = document.createElement('span');
      letter.textContent = 'ABC'[i]; letter.setAttribute('aria-hidden', 'true');
      button.append(letter, document.createTextNode(label)); button.setAttribute('aria-pressed', String(answers[step] === value));
      button.addEventListener('click', () => { answers[step] = value; if (step < QUESTIONS.length - 1) { step++; renderQuestion(true); } else showResult(); });
      $('quizOptions').append(button);
    });
    if (focus) $('questionTitle').focus({ preventScroll: true });
  }
  function showResult() {
    const result = assessRisk(answers); if (!result) return;
    $('quizQuestion').hidden = true; $('quizResult').hidden = false;
    $('quizStep').textContent = 'ASSESSMENT / COMPLETE';
    $('riskScore').textContent = result.score + '/100'; $('riskVerdict').textContent = result.title; $('riskNote').textContent = result.note;
    $('riskVerdict').focus({ preventScroll: true });
  }
  $('quizBack').addEventListener('click', () => { if (step > 0) { step--; renderQuestion(true); } });
  $('quizReset').addEventListener('click', () => { step = 0; answers = []; renderQuestion(true); });
  renderQuestion(false);
  $('weight').addEventListener('input', () => { const weight = Number($('weight').value), result = encounter(weight); $('weightValue').textContent = weight + ' LB'; $('simTitle').textContent = result[0]; $('simBody').textContent = result[1]; });

  let pledged = false;
  try { pledged = localStorage.getItem('sbr_pledged') === '1'; } catch (_) { /* Browser storage is optional. */ }
  function markPledged(saved) {
    $('pledgeButton').textContent = '✓ Officially concerned'; $('pledgeButton').disabled = true;
    $('pledgeStatus').textContent = saved ? 'Pledge saved. Your eyes are open. Your distance is maintained.' : 'Pledge taken for this visit. Your browser couldn’t save it for next time.';
  }
  if (pledged) markPledged(true);
  $('pledgeButton').addEventListener('click', () => {
    if (pledged) return; pledged = true; let saved = false;
    try { localStorage.setItem('sbr_pledged', '1'); saved = true; } catch (_) { /* Keep the pledge usable without storage. */ }
    markPledged(saved);
  });
  function campaignUrl() {
    if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:') return 'https://github.com/rowebotz/stop-big-roo';
    return new URL(location.pathname, location.origin).href;
  }
  $('shareButton').addEventListener('click', async () => {
    const url = campaignUrl();
    try {
      if (navigator.share) { await navigator.share({ title: 'Stop Big Roo', text: 'They have a pouch. We have questions.', url }); $('shareStatus').textContent = 'Campaign shared. Questions are spreading.'; }
      else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); $('shareStatus').textContent = 'Link copied. Send it to someone dangerously relaxed.'; }
      else showShareLink(url);
    } catch (error) { if (error.name !== 'AbortError') showShareLink(url); }
  });
  function showShareLink(url) { const link = document.createElement('a'); link.href = url; link.textContent = url; $('shareStatus').replaceChildren(document.createTextNode('Copy this link: '), link); }
  $('downloadCard').addEventListener('click', async () => {
    const button = $('downloadCard'); button.disabled = true;
    try {
      await document.fonts.ready;
      const photo = new Image(); photo.src = 'assets/roo-portrait.webp'; await photo.decode();
      const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 1500;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#1b201a'; ctx.fillRect(0, 0, 1200, 1500);
      ctx.drawImage(photo, 220, 0, 1000, 1024, 0, 100, 1200, 1229);
      const shade = ctx.createLinearGradient(0, 0, 1200, 0); shade.addColorStop(0, '#101611d9'); shade.addColorStop(1, '#10161100'); ctx.fillStyle = shade; ctx.fillRect(0, 100, 1200, 1229);
      ctx.fillStyle = '#e13926'; ctx.fillRect(0, 0, 1200, 100); ctx.fillRect(0, 1270, 1200, 230);
      ctx.fillStyle = '#f2f0e7'; ctx.font = 'bold 22px Arial'; ctx.fillText('STOP BIG ROO  /  AMERICANS FOR MARSUPIAL ACCOUNTABILITY', 55, 61);
      ctx.font = '180px Anton'; ctx.fillText('BIG LEGS.', 55, 365); ctx.fillText('BIGGER', 55, 565); ctx.fillStyle = '#f14a31'; ctx.fillText('AGENDA.', 55, 765);
      ctx.fillStyle = '#f2f0e7'; ctx.font = '30px Arial'; ctx.fillText('They hop. They kick. They are not sorry.', 60, 1160);
      ctx.fillStyle = '#1b201a'; ctx.font = '65px Anton'; ctx.fillText(pledged ? 'OFFICIALLY CONCERNED.' : 'THE HOP STOPS HERE.', 55, 1360);
      ctx.font = '25px Arial'; ctx.fillText('Take a stand. Keep your distance.', 58, 1410);
      ctx.font = '15px Arial'; ctx.fillText('A fictional awareness campaign. Respect wildlife. Artwork is AI-generated.', 58, 1470);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('Image export unavailable');
      const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = 'stop-big-roo-campaign-card.png'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 30000);
      $('shareStatus').textContent = 'Your campaign card is ready. Stay unreasonably vigilant.';
    } catch (_) { const link = document.createElement('a'); link.href = 'assets/campaign-poster.jpg'; link.download = 'stop-big-roo-campaign-poster.jpg'; link.textContent = 'Download the campaign poster instead ↓'; $('shareStatus').replaceChildren(link); }
    finally { button.disabled = false; }
  });
})();
