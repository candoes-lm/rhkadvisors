const breadcrumbLinks = document.querySelectorAll('.breadcrumb a[data-target]');
const subservices = document.querySelectorAll('.subservice');

breadcrumbLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.dataset.target;

    subservices.forEach(div => {
      div.classList.remove('active');
      div.style.display = 'none';
    });

    const targetDiv = document.getElementById(targetId);
    targetDiv.style.display = 'block';

    // Trigger reflow to restart animation
    void targetDiv.offsetWidth;

    targetDiv.classList.add('active');
  });
});

const tailLinks = document.querySelectorAll('.breadcrumb-tail + .arrow + .dropdown a[data-target]');

tailLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.dataset.target;

    // Toggle subservice content
    subservices.forEach(div => div.classList.remove('active'));
    const targetDiv = document.getElementById(targetId);
    if (targetDiv) {
      targetDiv.style.display = 'block';
      void targetDiv.offsetWidth;
      targetDiv.classList.add('active');
    }

    // Update breadcrumb tail
    updateBreadcrumbTail(targetId);
	
	    // Highlight matching sidebar link
    sidebarLinks.forEach(l => {
      l.classList.remove('active');
      if (l.dataset.target === targetId) {
        l.classList.add('active');
      }
    });

  });
});

const sidebarLinks = document.querySelectorAll('.subservice-sidebar a[data-target]');
const sidebarSubservices = document.querySelectorAll('.subservice');

sidebarLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.dataset.target;

    // Toggle content
    sidebarSubservices.forEach(div => {
		div.classList.remove('active');
		div.style.display = 'none';
		});
    
	const targetDiv = document.getElementById(targetId);
    targetDiv.style.display = 'block';

    // Trigger reflow to restart animation
    void targetDiv.offsetWidth;

    targetDiv.classList.add('active');

    // Highlight active link
    sidebarLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1); // remove the #
  const targetDiv = document.getElementById(hash);
  const subservices = document.querySelectorAll('.subservice');

  if (targetDiv) {
	updateBreadcrumbTail(hash);
    subservices.forEach(div => div.classList.remove('active'));
    targetDiv.classList.add('active');
  }
});

function updateBreadcrumbTail(subserviceId) {
  const breadcrumbTail = document.querySelector('.breadcrumb-tail');
  const targetDiv = document.getElementById(subserviceId);

  if (targetDiv && breadcrumbTail) {
    const title = targetDiv.querySelector('h3')?.textContent || subserviceId;
    breadcrumbTail.textContent = title;
  }
}

sidebarLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.dataset.target;

    // Toggle subservice content
    subservices.forEach(div => div.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');

    // Highlight active sidebar link
    sidebarLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Update breadcrumb tail
    updateBreadcrumbTail(targetId);
  });
});
